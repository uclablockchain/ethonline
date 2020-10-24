const SimpleToken = artifacts.require("SimpleToken");
const SimpleMessageStorage = artifacts.require("SimpleMessageStorage");
const ComposableSingleCaller = artifacts.require("ComposableSingleCaller");
const ComposableMultiCaller = artifacts.require("ComposableMultiCaller");
const Composable = artifacts.require("Composable");

module.exports = async function (deployer) {
  await deployer.deploy(SimpleToken, "SimpleToken", "SMPL");
  await deployer.deploy(SimpleMessageStorage, "Hello, world!");
  await deployer.deploy(ComposableSingleCaller);
  await deployer.deploy(ComposableMultiCaller);
  await deployer.deploy(
      Composable,
      ComposableSingleCaller.address,
      ComposableMultiCaller.address
  );
};
