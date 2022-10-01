import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0xf0F2070e76C252ca33210885B5A6c35867F923ad");


(async () => {
    try {
        // we define our conditions, this is an array of objects because
        // we can have multiple phases starting at different items if we want to 
        const claimConditions = [ {
            // when people are gonna be able to start claiming the NFTs (now)
            startTime: new Date(),
           
            // the max quantity of our collection
            maxQuantity: 1,

             // the maximum number of NFTs that can be claimed.
            MaxUint256: 1,
            // the price of our NFT (free)
            price: 0,
            // the amount of NFTs people can claim in one transaction.
            quantityLimitPerTransaction: 1,
            //We set the wait between transactions to MaxUnit256, which means 
            // people are only allowed to claim once.
            waitInSeconds: MaxUint256,
        }];

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    
    } catch (error) {
        console.error("Failed to set claim condition", error);
    }
})();