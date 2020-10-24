# composable
## Dependencies
 - [node](https://nodejs.org/en/)
 - [ganache-cli](https://github.com/trufflesuite/ganache-cli)

## Install
 - Download & install
 - ```bash
<<<<<<< HEAD
   git clone https://github.com/blockchainatucla/ethonline
   cd ./ethonline/composable
=======
   git clone
   https://github.com/blockchainatucla/ethonline
   cd ethonline
>>>>>>> 85ade81cca75841b35b0b938ef1044a2d58fa0d9
   npm install
   ```

## Set Up Environment Variables
 - change `env` to `.env`:
 - ```bash
   # contents of .env
   POKT_ARCHIVAL_URL="https://eth-archival.gateway.pokt.network/v1/"
   POKT_MAINNET_URL="https://eth-mainnet.gateway.pokt.network/v1/"
   POKT_APPLICATION_ID=
   GANACHE_HOST="127.0.0.1"
   GANACHE_PORT=8545
   GANACHE_MNEMONIC=
   ```
 - Populate this file with your ganache mnemonic and your pocket network application ID
<<<<<<< HEAD
 - Special thanks to [pocket network](https://www.pokt.network/) for providing access to their gateway endpoints!
=======
>>>>>>> 85ade81cca75841b35b0b938ef1044a2d58fa0d9

## Set Up Development Blockchain
Simply run:
```bash
sh ganache-fork-eth-mainnet.sh
```
Refer to `ganache-fork-eth-archival.sh` and `ganache-fork-eth-mainnet.sh` for the syntax of calling `ganache-cli` to hardfork ethereum mainnet. You may need to modify the permissions of the ganache shell scripts to be executable:
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
