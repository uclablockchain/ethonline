import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { ethers } from 'ethers';
import {GenericAPICall, getWeb3} from '../utils/common.js';

//0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
const Test = () => {


    const [web3Test, setWeb3Test] = useState(null);
    const [account, setAccount] = useState(null);

    const [formData, setFormData] = useState({
        loading: false,
        contractAddress: '',
        functions: [null],
        error: false,
        contractABI: null,
        composedFunctionJson: null,
        functionArguments: []
    });

    
    const getFunctions = async () => {

        var apiConfig = {
            method: 'GET',
            url: ('https://api.etherscan.io/api?module=contract&action=getabi&address=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&apikey=WJY1AAMZTEYBUTV776YCTYDI2HAQ38VU4W'),
            headers: {}
        }

        await GenericAPICall(apiConfig,
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

        /*
        const transactionParameters = {
            to: '0xEe6170Ea31b014d479746A719A56ab7a3aF977ad',
            from: account[0],
            value: '0x01'
        }
        

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
        })
        

        console.log(txHash);
        */

        
        await web3Test.eth.sendTransaction({
            from: account[0],
            to: '0xEe6170Ea31b014d479746A719A56ab7a3aF977ad',
            value: web3Test.utils.toBN(web3Test.utils.toWei('1', 'ether'))
        })
        
        
        /*
        var myContract = new web3Test.eth.Contract(formData.contractABI, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", {
            from: "0x35C185B8036C7D96269e8410c6f7178Ae08812Cf",
            gasPrice: '2000000000'
        });

        var mintSucks =  await myContract.methods.balanceOf('0x35C185B8036C7D96269e8410c6f7178Ae08812Cf').call()

        console.log(mintSucks);
        
        */
        /*
        
       const networkId = await web3Test.eth.net.getId();
       const deployedNetwork = SimpleStorage.networks[networkId];

       console.log({networkId, deployedNetwork})

       
       const contractInst = new web3Test.eth.Contract(
           SimpleStorage.abi,
           deployedNetwork && deployedNetwork.address
       );

       var called = await contractInst.methods.set(5).send({from: "0x35C185B8036C7D96269e8410c6f7178Ae08812Cf"});

       const response = await contractInst.methods.get().call();

       console.log(response);
       
        */

    }

    //  componentDidMount equivalent
    useEffect(() => {
       async function truffle(){
        try {
            // Get network provider and web3 instance.
            await getFunctions();
            var web3 = await getWeb3();
            var account = await web3.eth.getAccounts();
            setAccount(account);
            setWeb3Test(web3);
            // Use web3 to get the user's accounts.
            // Get the contract instance.
            //const networkId = await web3.eth.net.getId();
            //var contract = new web3.eth.Contract(formData.contractABI, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");
            
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
       } truffle();
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
