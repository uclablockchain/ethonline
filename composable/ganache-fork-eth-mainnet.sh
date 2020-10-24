#!/bin/zsh

# load environment variables from .env file
source .env
# open ganache using pocket network to fork mainnet node (might be fast synced?)
ganache-cli -h $GANACHE_HOST -p $GANACHE_PORT -f $ARCHIVAL_URL$APPLICATION_ID -m $GANACHE_MNEMONIC
