/**
 *
 * More information about truffle configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 *
 * Infura accounts are available for free at: infura.io/register.
 *
 *
 * Save a mnemonic and an infura key into `.env`
 *
 */
const path = require('path');
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

// provider URLs for different test nets
const GANACHE_URL = "http://localhost:8545"
const ROPSTEN_URL = "https://ropsten.infura.io/v3/" + process.env.INFURA_KEY;
const KOVAN_URL = "https://kovan.infura.io/v3/" + process.env.INFURA_KEY;

module.exports = {
  contracts_build_directory: path.join(__dirname, "../composable-ui/src/contracts"),
  networks: {
    development: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, GANACHE_URL),
      network_id: "*",       // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, ROPSTEN_URL),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, KOVAN_URL),
      network_id: 42,       // Kovan's id
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      // version: "0.5.1",
      // settings: {
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
