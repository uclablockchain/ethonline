const ComposableCaller = artifacts.require('ComposableCaller');
const SimpleMessageStorage = artifacts.require('SimpleMessageStorage');


module.exports = async (callback) => {
  const encodeParam = async (paramType, param) => {
      return web3.eth.abi.encodeParameter(paramType, param);
  }
  const encodeFunctionCall = async (jsonInterface, params) => {
      return web3.eth.abi.encodeFunctionCall(jsonInterface, params);
  }

  // get account
  var defaultAcct = await web3.eth.currentProvider.addresses[0];


  // load simpleMessageStorage contract
  const simpleMessageStorage = new web3.eth.Contract(SimpleMessageStorage.abi, SimpleMessageStorage.address);
  setMessage  = SimpleMessageStorage.abi[2];
  getMessage  = SimpleMessageStorage.abi[3];
  changeOwner = SimpleMessageStorage.abi[4];

  console.log('--------------------------------------------------------------------------------');
  console.log('Using default account: ', defaultAcct);
  console.log('Loaded: ', ComposableCaller.contractName, 'at: ', ComposableCaller.address);
  console.log('Loaded: ', SimpleMessageStorage.contractName, 'at: ', SimpleMessageStorage.address);
  // display the initial message before sending the tx
  let message = await simpleMessageStorage.methods.getMessage().call();
  console.log('--------------------------------------------------------------------------------');
  console.log('The initial message: ', message, '\n');


  // this is the intended message to set within the composed tx
  let theNewMessage = 'Message 2';
  // console.log(theNewMessage);
  // process.exit();
  // encode the message using our encoding standard
  const regularData = await encodeFunctionCall(setMessage, [theNewMessage]);

  console.log(regularData);
  let numBytes = ((regularData.length - 2) / 2);
  let size64 = await encodeParam('uint64', numBytes);
  
  console.log('Anatomy of a calldata: ')  

  let selector = regularData.slice(2, 10);
  let calldataSize = size64.slice(50)
  let data = regularData.slice(10);
  let value = "0000000000000000000000000000000000000000000000000000000000000000";
  
  console.log('target address:\n', SimpleMessageStorage.address)
  console.log('selector:\n', selector);
  console.log('size :\n', calldataSize);
  console.log('value:\n', value);
  console.log('calldata: ')
  console.log(data.slice(0, 64));
  console.log(data.slice(64, 128));
  console.log(data.slice(128), '\n');

  let speciallyEncoded = SimpleMessageStorage.address + selector + calldataSize + value + data;

  console.log('New message to set: ', theNewMessage, '\n');
  console.log("Typically encoded call: ", regularData, '\n');
  console.log('Composable encoded call: ', speciallyEncoded, '\n');

  let tx = { 
      "to": ComposableCaller.address,
      "from": defaultAcct,
      "value": value,
      "data": speciallyEncoded,
      "gas": 10000000,
      "gasPrice": 20000000000
  };

  console.log("If the console is frozen here, then the tx failed for some reason.");
//   console.log("We may possibly have to sign the transaction and send it as a raw tx, instead?");
  let response = await web3.eth.sendTransaction(tx);
  console.log('TxHash: ', response.transactionHash, '\n');

  // display the message after sending the tx
  message = await simpleMessageStorage.methods.getMessage().call();
  console.log('The final message: ', message);
  console.log('--------------------------------------------------------------------------------');


  callback();
};
