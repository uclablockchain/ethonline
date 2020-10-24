import { Card } from "@material-ui/core";
import React, { useState } from "react";
import * as S from "./Compose-Style.js";
import { getWeb3 } from "../../utils/common.js";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { useOvermind } from "../../overmind/index.js";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Compose = ({ callStack }) => {
  const { state, actions } = useOvermind();
  const [encodedCalls, setEncodedCalls] = useState([]);
  const [encoding, setEncoding] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    variant: 'success',
    message: ''
  })
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({...snack, open: false})
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  var callStack = [
    {
      contract: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
      callStack: [
        {
          id: 1,
          function: {
            constant: true,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
        {
          id: 1,
          function: {
            constant: true,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "notRealFunction",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
      ],
    },
    {
      contract: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
      callStack: [
        {
          id: 1,
          function: {
            constant: true,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
        {
          id: 1,
          function: {
            constant: true,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "notRealFunction",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
      ],
    },
    {
      contract: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
      callStack: [
        {
          id: 1,
          function: {
            constant: true,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
        {
          id: 1,
          function: {
            constant: true,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "notRealFunction",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
      ],
    },
  ];

  const encodeCallsFromState = (web3) => {
    var finalData = [];
    for (var item in callStack) {
      var contract = callStack[item].contract;
      var calls = callStack[item].callStack;

      var methodObject = {
        contractAddress: contract,
        calls: []
      }

      for (var call in calls) {
        var func = calls[call].function;
        var parameters = calls[call].inputs
        var formattedFunction = {
          name: func.name,
          type: func.type,
          inputs: func.inputs,
        };
        var encoded = web3.eth.abi.encodeFunctionCall(formattedFunction, parameters).slice(2);
        methodObject.calls.push(encoded);
      }
      finalData.push(methodObject);
    }

    return finalData;

  };

  const submitCalls = async () => {

    //  probably need to add some sort of loading indicator here
    //  also need to make sure the web3 object is legit
    var web3 = state.web3;
    if(web3){
      try{
        var encodedCalls = encodeCallsFromState(web3);
        console.log(encodedCalls);
        setSnack({
          open: true,
          variant: 'success',
          message: 'Calls encoded and successfully submitted to contract.'
        })
      } catch{
        setSnack({
          open: true,
          variant: 'error',
          message: 'Encoding Error: One of your inputs may be invalid.'
        })
      }
      

    } else {
      //make some sort of alert...
      setSnack({
        open: true,
        variant: 'error',
        message: "Web3 Error: MetaMask not connected."
      })
    }
    

  };

  return (
    <>
      {
        //<Header />
      }
      <S.Container
        initial={{ opacity: "3%" }}
        animate={{ opacity: "100%" }}
        transition={{ duration: 0.8 }}
        layout
      >
        <S.Jumbo>Composed Callstack</S.Jumbo>
        <S.SubmitButton onClick={submitCalls} disabled={encoding}>Submit Calls</S.SubmitButton>
        <S.CardStack>
          {callStack.map((item, index) => {
            return (
              <S.Card key={index}>
                <S.CardTitle color="#70AED3">Contract Address</S.CardTitle>
                <S.CardTitle>{item.contract}</S.CardTitle>
                <S.CardDetails>
                  <p style={{ color: "#70AED3" }}>Functions</p>
                </S.CardDetails>
                {item.callStack.map((call, index) => {
                  return (
                    <S.CardDetails key={call.function.name}>
                      <p>{call.function.name}</p>
                    </S.CardDetails>
                  );
                })}
              </S.Card>
            );
          })}
        </S.CardStack>
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
      </S.Container>
    </>
  );
};

export default Compose;
