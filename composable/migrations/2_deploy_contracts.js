const SimpleToken = artifacts.require("SimpleToken");
const SimpleMessageStorage = artifacts.require("SimpleMessageStorage");
const ComposableCaller = artifacts.require("ComposableCaller");

module.exports = async function (deployer) {
  await deployer.deploy(SimpleToken, "SimpleToken", "SMPL");
  await deployer.deploy(SimpleMessageStorage, "Hello, world!");
  await deployer.deploy(ComposableCaller);

};
