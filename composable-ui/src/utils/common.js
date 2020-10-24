import axios from 'axios';
import Web3 from "web3";

const GenericAPICall = (options, res, error) => {

  var config = {
    method: options.method,
    url: options.url,
    headers: options.headers
  }

  axios(config)
    .then(res)
    .catch(error);
}

const hasMetaMask = () => {
  if (typeof window.ethereum !== 'undefined') {
    //console.log('MetaMask is installed!');
    return true;
  } else {
    return false;
  }
}

// const getWeb3=()=>{}


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
});


const checkTypes = (type, input) => {

  switch(type){
    case 'uint':
    case 'uint8':
    case 'uint16':
    case 'uint160':
    case 'uint128':
    case 'uint256':
      return !isNaN(input)
    case 'address':
      return Web3.utils.isAddress(input)
    case 'bool':
      if(input.toLowerCase() === 'true' || input.toLowerCase() === 'false'){return true}
      else{return false}
    case 'bytes':
      return Web3.utils.isHex(input)
    default:
      return true
  }
}

  export  {GenericAPICall, hasMetaMask, getWeb3, checkTypes};
