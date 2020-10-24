# ETHOnline 2020 Hackathon Submission
## Composable
Composable is nearly here! We recognized a need to provide users and contracts with the ability to call multiple arbitrary functions from within the context of a single block. Individual DeFi users, in some cases, have been excluded from participating because of exorbitant gas fees. With certain DeFi actions spanning multiple protocols and transactions, users may even have transactions delayed if gas prices rise too quickly to accurately submit enough gas for an intermediate transaction, further compounding the problem. High gas costs have at least been _part_ of the motivation for aggregating token balances of accounts with aligned interests in delegated vaults, ie [yEarn](https://yearn.finance/), if not a major deciding factor. Furthermore, in the current paradigm of calling functions within transactions, contracts must inherit from a specific interface to natively interact with external contracts sans friction.

## abi encoding
[openzeppelin/contracts](https://github.com/openzeppelin/openzeppelin-contracts) has the utility library `Address.sol` that makes it possible to call arbitrary contracts. There's one caveat with that, though, which is that since `Address.sol` is inherited internally as a library, it does not accept `calldata` that is passed to `external` functions. So, Composable set out to create a generalized function caller that also optimizes gas efficiency by using specified encoding rules.

We propose a couple examples of Composable implementations using mainnet-live contracts. We will look at `Aave` flashloans, `Compound` governance, and `yEarn` delegated vaults.

As an example of a potential use case, consider Aave's [flashloans](https://docs.aave.com/developers/tutorials/performing-a-flash-loan/...-with-truffle), available through [aave/flashloan-box](https://github.com/aave/flashloan-box). Let's look at how it works, by inspecting the two main functions within `flashloan.sol`.

```
(docs/explanation incoming)
```

#### Resources
Consult [Resources.md](https://github.com/uclablockchain/ethonline/blob/main/docs/Resources.md) for developer docs/resources.

## composable
This is the smart contract backend of the composable project. Installation instructions are saved in its root folder.

## composable-ui
This is the web app that faces the user who interacts with composable.
