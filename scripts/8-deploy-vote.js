import sdk from "./1-initialize-sdk.js";

(async () => {
    try{ 
        const voteContractAddress = await sdk.deployer.deployVote({
            // give your governance contract a name.
            name: "My futuristic DAO",

            //this is the location of our governance token, our ERC-20 contract!
            voting_token_address: "0x1B0bedeA6f5730C411B50eb6626B6317cD7CC70F",

            // these parameters are specified in number of blocks.
            //Assuming block time of around 13.14 seconds (for ethereum)

            //after a proposal is created, when can members start voting?
            //for now, we set this to immmediatly. 
            voting_delay_in_blocks: 0,

            // how long do members have to vote in a proposal when it's created?
            //we will set it to 1 day = 6570 blocks
            voting_period_in_blocks: 6570,

            // the minimum % of the total supply that need to vote for 
            // the proposal to be valid after the time for the proposal has ended
            voting_quorum_fraction: 0,


            // what's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I set it to 0. meaning no token ares required for a user to be allowed to 
            //create a proposal.
            proposal_token_threshold: 0, 
        });

        console.log(
            "✅ Successfully deployed vote contract, address:",
            voteContractAddress,
        );
    } catch (err) {
        console.error("Failed to deploy vote contract", err);
    }

})();
