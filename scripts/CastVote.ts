import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";
dotenv.config()
//MyToken Address
const tokenAddress = "0x35B6AF53a000c14bd4e8E773128C428eE0883CbB"; 
//TokenizedBallot Address
const ballotAddress = ""; 
const proposalN = 0; //  proposal #
const votePower = 1; // voting power used 

async function main() {
    const provider = ethers.getDefaultProvider("goerli", { alchemy: process.env.ALCHEMY_API })
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);
    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(tokenAddress)
    const ballotContractFactory = new TokenizedBallot__factory(signer);
    const ballotContract = ballotContractFactory.attach(ballotAddress);
    const votingPower = await ballotContract.votingPower(signer.address);
        console.log("Checking voting power");
    if (votingPower.eq(0)) {
         return       
        console.log("You do not have voting power");
    } 
    console.log(`Voting for proposal #${proposalN}`);

    const voteTx = await ballotContract.vote(proposalN, votePower);
    await voteTx.wait();
    console.log("Thanks for voting!");
    const proposalVoteCount = await (await ballotContract.proposals(proposalN)).voteCount;
    console.log(`Your proposal has ${proposalVoteCount} votes`);
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})