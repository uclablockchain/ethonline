import React, { useState } from "react";
import * as S from './MetaMask-Style.js';
import {useOvermind} from '../../../overmind';
import { getWeb3 } from '../../../utils/common.js';


const MetaMaskButton = () => {

  const [loading, setLoading] = useState(false);
  const {state, actions} = useOvermind();

  const connectWallet =  () => {
    console.log('test')
    setLoading(true);
    
    /*
    let web3 = await getWeb3();
    if(web3){
      actions.setWeb3(web3);
      var account = await web3.eth.getAccounts();
      account = account[0];
      actions.setAccount(account);
    }
    setLoading(false);
    console.log('done loading.')
    */
  }

  return (
    <S.WalletButton onClick={()=>{console.log('cliked!')}} loading={loading ? 'infinite': '0'} disabled={!loading}>
      <img
        onClick={()=>{console.log('clicked')}}
        src="metamask.svg"
        alt="metamask logo"
        height={"25px"}
        width={"25px"}
        style={{ marginRight: "10px" }}
      />
      Connect Wallet
    </S.WalletButton>
  );
};

export default MetaMaskButton;
