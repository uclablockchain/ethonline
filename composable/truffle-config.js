/**
 *
 * More information about truffle configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 */
const path = require('path');
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

// provider URLs for different test nets
const GANACHE_URL = "http://" + process.env.GANACHE_HOST + ':' + process.env.GANACHE_PORT;
const ROPSTEN_URL = "https://ropsten.gateway.pokt.network/v1/" + process.env.APPLICATION_ID;
const KOVAN_URL = "https://kovan.gateway.pokt.network/v1/" + process.env.APPLICATION_ID;

module.exports = {
  // contracts_build_directory: path.join(__dirname, "../composable-ui/src/contracts"),
  networks: {
    development: {
      provider: () => new HDWalletProvider(process.env.GANACHE_MNEMONIC, GANACHE_URL),
      network_id: "*",       // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.GANACHE_MNEMONIC, ROPSTEN_URL),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.GANACHE_MNEMONIC, KOVAN_URL),
      network_id: 42,       // Kovan's id
    }
  },
  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    },
  },
};
