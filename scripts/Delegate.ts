import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyToken__factory } from "../typechain-types";
dotenv.config()
//MyToken Address
const contractAddress = "0x35B6AF53a000c14bd4e8E773128C428eE0883CbB";
async function main() {
    const provider = ethers.getDefaultProvider("goerli", { alchemy: process.env.ALCHEMY_API });
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);
    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(contractAddress);
    const votePower = await tokenContract.getVotes(signer.address);
    console.log(`Your voting power is: ${votePower}`);
    if (votePower.eq(0)) {
        return(
        console.log("no voting power"));  
    }
    console.log("Delegating votes");
    const mintTx = await tokenContract.delegate(signer.address);
    await mintTx.wait();

    const newVotePower = await tokenContract.getVotes(signer.address);
    console.log(`Your voting power: ${newVotePower}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})