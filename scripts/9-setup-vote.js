import sdk from "./1-initialize-sdk.js";

// This is our governace contract.

const vote = sdk.getVote("0xa9083c53a20cB183863f8680e68f522cE1f00106");

// This is our ERC-20 contract.
const token = sdk.getToken("0x1B0bedeA6f5730C411B50eb6626B6317cD7CC70F");

(async () => {
    try{
        // Give our treasury the power to mint addtional token if needed
        await token.roles.grant("minter", vote.getAddress());

        console.log(
            "Successfully gave vote contract permissions to act on token contract"

        ); 
    } catch (error) { (        "Faild to grant vote contract permission on token contract",
        error
    ); 
    process.exit(1);
}

try {
    //Grab our wallet's token balance, rememberv--- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
        process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const owendAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(owendAmount) / 100 * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
        vote.getAddress(),
        percent90
    );

    console.log(` ✅ Successfully transferred ${percent90} tokens to vote contract` );
} catch (err) {
    console.error("failed to transfer token to vote contract", err);
}
})();