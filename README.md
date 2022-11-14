# Encode HW Week 3 -- Group 8

#### If using Yarn:

- yarn
- yarn hardhat compile

#### If using NPM:

- npm install --force
- npx hardhat compile

Project is now installed on your machine.

Create a new ".env" file or copy one from another lesson and paste it

## Note: 

Tokens are minted 1:1 with gwei so a BUY_AMOUNT of 0.01 would mint 10000000000000000 tokens

### ERC20 Voting Token Deployment

- yarn run ts-node ./scripts/DeployToken.ts

Copy and keep this output for future use. If you are the admin of this contract you may mint tokens to any address you choose without paying.

### Mint ERC20 Voting Tokens to an address

- yarn run ts-node ./scripts/MintToken.ts CONTRACT_ADDRESS MINT_TO_ADDRESS MINT_AMOUNT

Replace CONTRACT_ADDRESS with the address you got from the deployment step. 

MINT_TO_ADDRESS is the wallet address you want to mint voting tokens for. 

MINT_AMOUNT is the number of tokens to mint denominated in ether. 

### Buy ERC20 Voting Tokens

- yarn run ts-node ./scripts/BuyToken.ts CONTRACT_ADDRESS BUY_AMOUNT

Replace CONTRACT_ADDRESS with the address you got from the deployment step. 

BUY_AMOUNT is the amount of ether you are sending to the contract. 


** This mints the tokens to whoever sends the transaction so mint address in not needed


### Delegate Voting power


- yarn run ts-node ./scripts/Delegate.ts CONTRACT_ADDRESS DELEGATE_TO

DELEGATE_TO is the address you want to receive the voting power of your tokens. 

** Enter your own address if you want to self-delegate.

#### Notes

The ERC20Votes contract is deployed to goerli. The address is:
0x35B6AF53a000c14bd4e8E773128C428eE0883CbB

