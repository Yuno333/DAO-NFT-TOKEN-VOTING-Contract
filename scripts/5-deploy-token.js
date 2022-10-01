import {AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
    try{
        // delopy a standard ERC-20 contract
        const tokenAddress = await sdk.deployer.deployToken({
            //What's your token name
            name: "ArasakaDAO Governance Token",
            //What's your token's symbol?
            symbol: "Asaki-Hōbi",
            //This will be in case we want to sell our token,
            // because we don't, we set it to AddressZero again.
            primary_sale_recipient: AddressZero
        });

        console.log(
            "✅ Successfully deployed token module, address:",
            tokenAddress,
        );

    } catch (error) {
        console.error("Failed to deploy token module", error);

    }


})();