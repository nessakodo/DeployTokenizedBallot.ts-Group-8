import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyToken__factory } from "../typechain-types";
dotenv.config()
//MyToken Address
const contractAddress = "0x35B6AF53a000c14bd4e8E773128C428eE0883CbB";
const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
    const provider = ethers.getDefaultProvider("goerli", { alchemy: process.env.ALCHEMY_API });
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);


    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(contractAddress);

    const signerBalance = await tokenContract.balanceOf(signer.address);

    console.log(`Your balance is: ${signerBalance}`);

    console.log("Minting tokens");
    const mintTx = await tokenContract.mint(signer.address, MINT_VALUE);
    await mintTx.wait();

    const newBalance = await tokenContract.balanceOf(signer.address);
    console.log(`Your new balance is: ${newBalance}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})