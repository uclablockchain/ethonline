const Composable = artifacts.require('Composable');
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

  // load composable contract
  const composable = new web3.eth.Contract(Composable.abi, Composable.address);
  const composableEncodeCall = Composable.abi[3];
  const composableSendCall = Composable.abi[4];
  const composableSingleCaller = await composable.methods.composableSingleCaller().call();
  const composableMultiCaller = await composable.methods.composableMultiCaller().call();

  // load simpleMessageStorage contract
  const simpleMessageStorage = new web3.eth.Contract(SimpleMessageStorage.abi, SimpleMessageStorage.address);
  setMessage  = SimpleMessageStorage.abi[2];
  getMessage  = SimpleMessageStorage.abi[3];
  changeOwner = SimpleMessageStorage.abi[4];

  console.log('--------------------------------------------------------------------------------');
  console.log('Using default account: ', defaultAcct);
  console.log('Loaded: ', Composable.contractName, 'at: ', Composable.address);
  console.log('Loaded: ', SimpleMessageStorage.contractName, 'at: ', SimpleMessageStorage.address);
  // display the initial message before sending the tx
  let message = await simpleMessageStorage.methods.getMessage().call();
  console.log('--------------------------------------------------------------------------------');
  console.log('The initial message: ', message, '\n');


  // this is the intended message to set within the composed tx
  let theNewMessage = 'Ouch!';

  // encode the message using our encoding standard
  const regularData = await encodeFunctionCall(setMessage, [theNewMessage]);
  let numBytes = ((regularData.length - 2) / 2) + 2;
  console.log(regularData.length);
  console.log(numBytes);
  let size96 = await encodeParam('uint96', numBytes);
  let speciallyEncoded = SimpleMessageStorage.address + size96.slice(42) + regularData.slice(2);

  // console.log('New message to set: ', theNewMessage, '\n');
  console.log("Typically encoded call: ", regularData, '\n');
  console.log('Composable encoded call: ', speciallyEncoded, '\n');

  // process.exit();


  let tx = {
      "to": composableSingleCaller,
      "from": defaultAcct,
      "value": 0,
      "data": speciallyEncoded,
      "gas": 1000000,
      "gasPrice": 20000000000
  };

  console.log("If the console is frozen here, then the tx failed for some reason.");

  let response = await web3.eth.sendTransaction(tx);
  console.log('TxHash: ', response.transactionHash, '\n');

  // display the message after sending the tx
  message = await simpleMessageStorage.methods.getMessage().call();
  console.log('The final message: ', message);
  console.log('--------------------------------------------------------------------------------');


  callback();
};
