import React, { useState } from "react";
import * as S from './MetaMask-Style.js';
import Web3 from 'web3';
import {useOvermind} from '../../../overmind';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//import { getWeb3 } from '../../../utils/common.js';


const MetaMaskButton = () => {

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    variant: 'success',
    message: ''
  })
  const [isConnected, setIsConnected] = useState(false);
  const {state, actions} = useOvermind();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({...snack, open: false})
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const connectWallet = async () => {
    if(window.ethereum && state.web3 == null) {
      const web3 = new Web3(window.ethereum);
      var account = await web3.eth.getAccounts();
      account = account[0];
      actions.setAccount(account);
      actions.setWeb3(web3);
      console.log(state.web3);
      setIsConnected(true);
      setSnack({...snack, open: true, variant: 'success', message: 'MetaMask connected successfully.'})
    } else if(!window.ethereum) {
      setSnack(({...snack, open: true, variant: 'error', message: 'MetaMask not detected.'}));
    }
  }

  const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
});

  return (
    <>
    <S.WalletButton onClick={connectWallet}>
      <img
        src="metamask.svg"
        alt="metamask logo"
        height={"25px"}
        width={"25px"}
        style={{ marginRight: "10px" }}
      />
      {isConnected ? "Connected":"Connect Wallet"}
    </S.WalletButton>
    <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={snack.variant}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MetaMaskButton;
