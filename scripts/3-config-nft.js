import sdk from "./1-initialize-sdk.js";
import { read, readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xf0F2070e76C252ca33210885B5A6c35867F923ad");


(async () => {
    try {
      await editionDrop.createBatch([
        {
            name: "Robot Hand",
            description: "This NFT will give you access to ArasakaDAO!",
            image: readFileSync("scripts/assets/arasaka.jpg"),
        },
      ]);
      console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
      console.error("failed to create the new NFT", error);
    }
  })();



