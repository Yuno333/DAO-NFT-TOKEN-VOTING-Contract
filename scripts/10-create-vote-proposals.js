import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// This is our governance contract
const vote = sdk.getVote("0xa9083c53a20cB183863f8680e68f522cE1f00106");

//this is our ERC-20 contract.
const token = sdk.getToken("0x1B0bedeA6f5730C411B50eb6626B6317cD7CC70F");

(async () => {
    try{
        // Create proposal to mint 420,000 new token to the treasury.
        const amount = 420_000;
        const description = `Should the DAO mint addtional ${amount} tokens into the treasury ?`;
        const executions = [
            {
                // Our token contract that actually executes the mint.
                toAddress: token.getAddress(),
                 // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        // We're just minting new tokens to the treasury. So, set to 0.
        nativeTokenValue: 0,
         // We're doing a mint! And, we're minting to the vote, which is
        // acting as our treasury.
        // in this case, we need to use ethers.js to convert the amount
        // to the correct format. This is because the amount it requires is in wei.
                transactionData: token.encoder.encode(
                    "mintTo",[
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
            }
        ];

        await vote.propose(description, executions);

        console.log("✅ Successfully created proposal to mint tokens");

    } catch(error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try {
        // Create proposal to transfer ourselves 6,900
        const amount = 6_900;
        const description = `Should the DAO transfer ${amount} tokens from the treasury`
        process.env.WALLET_ADDRESS + "for being awesome?";
        const executions = [
            {
                // again we're sending ourselves 0 eth. just sending our own token.
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    // we're doing a transfer from the treasury to our wallet.
                    "transfer",
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ), 
                toAddress: token.getAddress(),
            },
        ];

        await vote.propose(description, executions);

        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"

        );
    } catch (error) {
        console.error(" failed to create second proposal", error);
    }

})();