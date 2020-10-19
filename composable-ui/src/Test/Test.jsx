import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { ethers } from 'ethers';
import {GenericAPICall, getWeb3} from '../utils/common.js';

//0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
const Test = () => {


    const [web3State, setWeb3State] = useState({
        myWeb3: null,
        accounts: null,
        contract: null
    })
    const [w3, setW3] = useState(null);

    const [formData, setFormData] = useState({
        loading: false,
        contractAddress: '',
        functions: [null],
        error: false,
        contractABI: null,
        composedFunctionJson: null,
        functionArguments: []
    });

    
    const getFunctions = () => {

        var apiConfig = {
            method: 'GET',
            url: ('https://api.etherscan.io/api?module=contract&action=getabi&address=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&apikey=WJY1AAMZTEYBUTV776YCTYDI2HAQ38VU4W'),
            headers: {}
        }

        GenericAPICall(apiConfig,
            (res) => {
                var contractABI = ""
                contractABI = JSON.parse(res.data.result);
                if (contractABI) {

                    var functions = contractABI.filter(function (item) {
                        return item.type === "function"
                    })
                    console.log(functions);

                    setFormData({ ...formData, contractABI: contractABI, functions: functions, loading: false })
                }
            },
            (err) => { setFormData({ ...formData, error: true }); console.log(err) }
        )
    }

    const handleClick = async () => {
        
    }

    //  componentDidMount equivalent
    useEffect(() => {
        
        /*
        async function connectWeb3() {
            //  get network provider & web3 instance
            try{
                let web3;
                if(window.ethereum){
                    console.log('here1')
                    web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    setW3(web3);
                } else if (window.web3){
                    //  the homie's legacy dapp browsers
                    console.log('here2');
                    web3 = new Web3(window.web3.currentProvider);
                }
            }
            finally{
                console.log('finally')
            }

            //  use web3 to get user account
            //const accounts = await web3.eth.getAccounts();
            //const networkId = await web3.eth.net.getId();
        }
        connectWeb3();
        */
       async function truffle(){
        try {
            // Get network provider and web3 instance.
            await getFunctions();
            const web3 = await getWeb3();
      
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
      
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            /*
            const instance = new web3.eth.Contract(
              formData.contractABI,
              "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
            );
            */
            
      
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            //this.setState({ web3, accounts, contract: instance }, this.runExample);
          } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
       }
       truffle();
        //getFunctions();
        
    }, [])

    return (
        <div>
            <h1>Testing</h1>
            <button onClick={handleClick}>
                Do something
            </button>
        </div>
    )
}

export default Test
