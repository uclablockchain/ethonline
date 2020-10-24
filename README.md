# ETHOnline 2020 Hackathon Submission

## composable
See [Encoding.md](https://github.com/uclablockchain/ethonline/blob/main/docs/Encoding.md) for our encoding standard. This is the smart contract backend of the composable project. Installation instructions are saved in its root folder.

## composable-ui
This is the web app that faces the user who interacts with composable.

## Composable
Composable is nearly here! We recognized a need to provide users and contracts with the ability to call multiple arbitrary functions from within the context of a single block. Individual DeFi users, in some cases, have been excluded from participating because of exorbitant gas fees. With certain DeFi actions spanning multiple protocols and transactions, users may even have transactions delayed if gas prices rise too quickly to accurately submit enough gas for an intermediate transaction, further compounding the problem. High gas costs have at least been _part_ of the motivation for aggregating token balances of accounts with aligned interests in delegated vaults, ie [yEarn](https://yearn.finance/), if not a major deciding factor. Furthermore, in the current paradigm of calling functions within transactions, contracts must inherit from a specific interface to natively interact with external contracts sans friction.

## Examples
We propose a couple examples of Composable implementations for eventual use in mainnet contracts, after a period of thorough testing. We will look at `Aave` flashloans, `Compound` governance, and `yEarn` delegated vaults as potentially improved protocols via this encoding standard.

As an example of a potential use case, consider Aave's [flashloans](https://docs.aave.com/developers/tutorials/performing-a-flash-loan/...-with-truffle), available through [aave/flashloan-box](https://github.com/aave/flashloan-box). Let's look at how it works, by inspecting the two main functions within `flashloan.sol`.


#### Resources
Consult [Resources.md](https://github.com/uclablockchain/ethonline/blob/main/docs/Resources.md) for developer docs/resources.
