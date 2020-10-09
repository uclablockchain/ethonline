#!/bin/zsh

# load environment variables from .env file
source .env

# open ganache on 127.0.0.1:8545
ganache-cli -h "127.0.0.1" -p 8545 -f $MAINNET_URL$APPLICATION_ID -m $MNEMONIC
