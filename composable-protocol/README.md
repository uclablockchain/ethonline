# composable
## Dependencies
 - [node](https://nodejs.org/en/)
 - [ganache-cli](https://github.com/trufflesuite/ganache-cli)

## Install
 - Download & install
 - ```bash
   git clone
   https://github.com/blockchainatucla/ethonline
   cd ethonline
   npm install
   ```

## Set Up Environment Variables
 - create `.env`:
 - ```bash
   # contents of .env
   APPLICATION_ID="pocket network app id"
   ARCHIVAL_URL="pocket network archival gateway"
   MAINNET_URL="pocket network mainnet gateway"
   INFURA_KEY="abcdefghijklmnop"
   MNEMONIC="this is not actually a valid mnemonic but it should make sense"
   ```

## Set Up Development Blockchain
Simply run:
```bash
./ganache-fork-eth-mainnet.sh
```
Refer to `ganache-fork-eth-archival.sh` and `ganache-fork-eth-mainnet.sh` for the syntax of calling `ganache-cli` to hardfork the ethereum mainnet. You may need to modify the permissions of the ganache shell scripts to be executable:
```bash
sudo chmod 755 ganache-fork-eth-archival.sh
```

## Running a Script
Truffle can execute calls to the blockchain using the providers set up in truffle-config.js. Once you have ganache running, to call a script `getBalance.js` through truffle, use the following command:
```bash
truffle exec scripts/getBalance.js
```
Read the [truffle documentation](https://www.trufflesuite.com/docs/truffle/getting-started/writing-external-scripts) for writing scripts in truffle

## Deploying Contracts to Testnet
With ganache running, use truffle as normal.
```bash
truffle compile
truffle migrate
```
