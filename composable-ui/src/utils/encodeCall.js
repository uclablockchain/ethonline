const Composable = artifacts.require('Composable');
const ExampleContract = artifacts.require('ExampleContract');

require('dotenv').config();

module.exports = async (callback) => {
  /**
  * @notice The point of this script is to test abi encoding an arbitrary
  *         function with arbitrary parameters
  *
  **/

  function rightPad(bytesArray) {
      let zeros = [];
      while ((zeros.length + bytesArray.length) % 32) {
          zeros[zeros.length] = 0;
      }
      return zeros.concat(bytesArray);
  }

  function encodeBytes(bytesArray) {
      let prepend = web3.eth.abi.encodeParameter('uint256', bytesArray.length);
      bytesArray = rightPad(bytesArray);
  }

  function composableEncodeFunction(addr, functionJsonInterface, params) {
    return addr + web3.eth.abi.encodeFunctionCall(functionJsonInterface, params).slice(2);
  }

  function composableEncodeNCalls(_calls) {
    return web3.eth.abi.encodeFunctionCall(
        {
        "name": "executeNCalls",
        "outputs":[],
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
         {
             "internalType": "bytes[]",
             "name": "_calldatas",
             "type": "bytes[]"
         }
        ]
        }, _calls);
  }


  // load composable contract for calling N functions
  const composable = await Composable.deployed();
  // console.log(composable);
  // callback();

  // load contract which we wish to call externally through composable
  const exampleContract = await ExampleContract.deployed();

  /**
  * @notice Here, there should be the UI logic which parses the abi for
  *         metadata. For now, this is hardcoded to demonstrate encoding
  *         within truffle using javascript functions and web3.js
  **/

  const exampleABI = JSON.parse(ExampleContract.metadata);
  for (var i = 0; i < exampleABI.output.abi.length; i++) {
      // console.log(exampleABI.output.abi[i]);
  }
  // console.log(exampleABI.output.abi);
  var setMessage = exampleABI.output.abi[4];

  const composableABI = JSON.parse(Composable.metadata);
  // console.log(composableABI);
  const executeNCalls = composableABI.output.abi[0];

  var exampleAddr = exampleContract.address;
  var composedData = composableEncodeFunction(
      exampleAddr,
      setMessage,
      ['Hi.']
  );
  console.log(composedData);
  // console.log(web3.utils.hexToBytes('0x42'));
  // var ans = web3.eth.abi.encodeParameter('uint32', 0x42);
  // var ans = web3.utils.bytesToHex('2');
  // console.log(ans);

  // var bytesComposedData = web3.utils.hexToBytes(composedData);
  // console.log(bytesComposedData);

  // var encoded = web3.eth.abi.encodeFunctionCall(setMessage, ['Hi.']);
  // console.log(encoded);




  var tx = {
    "to": exampleAddr, // recipient contract
    "value": 0, // wei
    "data": encoded,
    "nonce": 0,
    "from": web3.eth.accounts[0],
    "gas": 64000,
    "gasPrice": 20000000000
  }

  // raw_tx = web3.eth.signTransaction(tx);

  // tx_hash = await web3.eth.sendRawTransaction(tx);

  // console.log(tx);


  // console.log(web3.utils.hexToBytes(exampleAddr));
  // console.log(web3.utils.asciiToHex(exampleAddr.slice(2)));
  // console.log(web3.utils.hexToBytes(web3.utils.asciiToHex(exampleAddr.slice(2))));


  // console.log(web3.utils.asciiToHex('Hi there.'));
  // var encodedTest = web3.eth.abi.encodeParameter('string', 'Hi there.');
  // console.log(encodedTest);

  // var composedCalls = web3.eth.abi.encodeFunctionCall(
  //     executeNCalls, [bytesComposedData]
  // );
  // console.log(composedCalls);


  var callData = web3.eth.abi.encodeFunctionCall(setMessage, ['Hi.']);
  var tx = web3.eth.accounts.sign(
      {
          "to": target,
          "from": process.env.PUBLIC,
          "nonce": 0,
          "value": 0,
          "data": callData,
          "gas": 64000,
          "gasPrice": 20000000000
      },
      process.env.PRIVATE
  )
  console.log(tx);


  callback();
};
