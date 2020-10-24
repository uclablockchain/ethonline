const Composable = artifacts.require('Composable');
const ComposableSingleCaller = artifacts.require('ComposableSingleCaller');
const SimpleToken = artifacts.require('SimpleToken');

module.exports = async (callback) => {
  /**
  * @notice this doesn't work yet, and it's because of the contracts, not the
  *         javascript
  **/

  var defaultAcct = await web3.eth.currentProvider.addresses[0];
  var friendlyAcct = await web3.eth.currentProvider.addresses[1];
  const composable = new web3.eth.Contract(Composable.abi, Composable.address);

  const simpleToken = new web3.eth.Contract(SimpleToken.abi, SimpleToken.address);
  const approve = SimpleToken.abi[4];
  const decreaseAllowance = SimpleToken.abi[7];
  const increaseAllowance = SimpleToken.abi[8];
  const transfer = SimpleToken.abi[12];
  const transferFrom = SimpleToken.abi[13];

  const encodeParam = async (paramType, param) => {
      return web3.eth.abi.encodeParameter(paramType, param);
  }

  const encodeFunctionCall = async (jsonInterface, params) => {
      return web3.eth.abi.encodeFunctionCall(jsonInterface, params);
  }

  // console.log('Using account: ', defaultAcct);
  // console.log('Receiving account: ', friendlyAcct);
  // console.log('Loaded: ', Composable.contractName, 'at: ', Composable.address);
  // console.log('Loaded: ', SimpleToken.contractName, 'at: ', SimpleToken.address);


  // var sendApprove = await encodeFunctionCall(approve, [friendlyAcct, "10000000000000000000"]);
  // console.log(sendApprove);

  // var sendTransfer = await encodeFunctionCall(transfer, [friendlyAcct, "10000000000000000000"]);
  // console.log(sendTransfer);

  // var composableSendApprove = await encodeComposableCall(SimpleToken.address, approve, [friendlyAcct, "10000000000000000000"]);
  // console.log(composableSendApprove);

  // var composableSendTransferFrom = await encodeComposableCall(SimpleToken.address, transferFrom, [defaultAcct, friendlyAcct, "10000000000000000000"]);
  // console.log(composableSendTransferFrom);

  // var composableSendTransfer = await encodeComposableCall(SimpleToken.address, transfer, [friendlyAcct, "10000000000000000000"]);
  // console.log(composableSendTransfer);

  // var balance = await simpleToken.methods.balanceOf(defaultAcct).call();
  // console.log("Balances: ");
  // console.log(defaultAcct, ":", balance);
  // balance = await simpleToken.methods.balanceOf(friendlyAcct).call();
  // console.log(friendlyAcct, ":", balance);

  // transaction = {
  //     "from": defaultAcct,
  //     "to": ComposableSingleCaller.address,
  //     // "to": SimpleToken.address,
  //     "value": 0,
  //     "data": sendTransfer,
  //     "gas": 100000000,
  //     "gasPrice": 20000000000
  // }
  // console.log(transaction.transactionHash);

  // let response = await web3.eth.sendTransaction(transaction);
  // console.log(response.transactionHash);
  // balance = await simpleToken.methods.balanceOf(defaultAcct).call();
  // console.log("Balances: ");
  // console.log(defaultAcct, ":", balance);
  // balance = await simpleToken.methods.balanceOf(friendlyAcct).call();
  // console.log(friendlyAcct, ":", balance);

  callback();
};
