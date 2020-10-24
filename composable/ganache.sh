#!/bin/zsh

# load environment variables from .env file
source .env

# open ganache
ganache-cli -h $GANACHE_HOST -p $GANACHE_PORT -m $GANACHE_MNEMONIC
