import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

//importing and configuring our .env file that we use to securely store our environment variables

import dotenv from "dotenv"
dotenv.config();
// some quick checks to make sure our .env is working 

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY ===""){
    console.log("🛑 Private key not found.");
}
if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
    console.log("🛑 QuickNode API URL not found.");
  }
  
  if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
    console.log("🛑 Wallet Address not found.");
  }

// PRC URL, we'll use our Alchemy API URL from .env file 

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
//your wallet private key. Always KEEP THIS PRIVATE, DO NOT SHARE IS WITH ANYONE / DONT UPLOAD IS TO GITHUB
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk = new ThirdwebSDK(wallet);

(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log("👍SDK initialized by address:", address)
    } catch (err) {
        console.error("Failed to get apps from sdk", err);
        process.exit(1);
    }
})();

// we are exporting the initialized thirdweb SDK so that we can use it in our other scripts 

export default sdk;


