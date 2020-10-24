
module.exports = async (callback) => {
  /**
  * @notice The point of this script is to get the Ether balance of whatever
  *         address is saved here, e.g., Yearn: Deployer, via the forked
  *         mainnet instance graciously provided by pocket network,
  *         through ganache.
  **/
  const YearnDeployerAddress = "0x2D407dDb06311396fE14D4b49da5F0471447d45C";
  let balance = await web3.eth.getBalance(YearnDeployerAddress);
  callback(balance);
};
