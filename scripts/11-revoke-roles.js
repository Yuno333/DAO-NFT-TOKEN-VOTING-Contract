import sdk from "./1-initialize-sdk.js";
  const token = sdk.getToken("0x1B0bedeA6f5730C411B50eb6626B6317cD7CC70F");

  (async () => {
    try{
        // Log the current roles,
        const allRoles = await token.roles.getAll();
        console.log("👀 Roles that exist right now:", allRoles);

        // Revoke all the privilage / superpowers your wallte had over the ERC-20 contract.
        await token.roles.setAll({ admin: [], minter: []});
        console.log(
            "🎉 Roles after revoking ourselves",
            await token.roles.getAll()

        );
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract")
    } catch (error) {
        console.error("failed to revoke ourselves from the DAO treasury", error);
    }
  })();