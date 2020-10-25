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
    variant: "success",
    message: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({ ...snack, open: false });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  /*
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
          inputs: [
            "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
            "swag",
            "8210",
          ],
        },
        {
          id: 1,
          function: {
            constant: true,
            inputs: [
              { name: "newOwner", type: "address" },
              { name: "notAnInput", type: "uint256" },
            ],
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
  */


  const encodeComposableData = (web3, targetAddress, encodedData) => {
    if(web3){
      var calldatasize = web3.eth.abi.encodeParameter(
        "uint96",
        (encodedData.length - 2) / 2
      );
      return targetAddress + calldatasize.slice(42) + encodedData.slice(2);
    } else {
      return null;
    }

  };


  const encodeSingleCall = (web3, func, params) => {
    if(web3){
      var encoded = web3.eth.abi.encodeFunctionCall(func, params);
      return encoded;
    } else {
      return null;
    }
  }
  

  const encodeCallsFromState = (web3) => {
    var finalData = [];
    for (var item in callStack) {
        /**
        * @notice The data stored in callStack takes the form of an array:
        * [{contractAddress: '...', funcName: '...', types: '...', inputs: '...'}, ...]
        **/
      var contract = callStack[item].contract;
      var calls = callStack[item].callStack;

      console.log(contract);
      console.log(calls);

      var methodObject = {
        contractAddress: contract,
        calls: [],
      };

      for (var call in calls) {
        var func = calls[call].function;
        var parameters = calls[call].inputs;
        var formattedFunction = {
          name: func.name,
          type: func.type,
          inputs: func.inputs,
        };
        var encoded = web3.eth.abi.encodeFunctionCall(
          formattedFunction,
          parameters
        );
        methodObject.calls.push(encoded);
      }
      finalData.push(methodObject);
    }

    return finalData;
  };

  const submitCalls = async () => {
    var web3 = state.web3;
    if (web3) {
      try {
        var encodedCalls = encodeCallsFromState(web3);

        // var encodedData = ;
        // for (encodedCall in encodedCalls) {
        //     encodedData =
        // }

        console.log(encodedCalls);
        setSnack({
          open: true,
          variant: "success",
          message: "Calls encoded and successfully submitted to contract.",
        });
      } catch {
        setSnack({
          open: true,
          variant: "error",
          message: "Encoding Error: One of your inputs may be invalid.",
        });
      }
    } else {
      //make some sort of alert...
      setSnack({
        open: true,
        variant: "error",
        message: "Web3 Error: MetaMask not connected.",
      });
    }
  };

  //  runs when a single tx card is clicked.
  //  encodes data for a single call,
  //  then transcribes to composed call.
  //  has some todos for error handling.
  const sendSingleTx = (call, contract) => {
    var func = call.function;
    var params = call.inputs;
    var formattedABI = {
      name: func.name,
      type: func.type,
      inputs: func.inputs,
    }
    var encoded = encodeSingleCall(state.web3, formattedABI, params);
    //  TODO: check if null && display error toast
    if(encoded === null){
      setSnack({
        open: true,
        variant: "error",
        message: "Error: MetaMask not connected."
      })
    }

    var composedAndEncoded = encodeComposableData(state.web3, contract, encoded)
    if(composedAndEncoded === null){
      setSnack({
        open: true,
        variant: "error",
        message: "Error: MetaMask not connected."
      })
    }
    //  TODO: check if null && display error toast
    console.log(composedAndEncoded)
    alert('Encoding sent to composable contract: ' + composedAndEncoded)
  };

  return (
    <>
      <S.Container
        initial={{ opacity: "3%" }}
        animate={{ opacity: "100%" }}
        transition={{ duration: 0.8 }}
        layout
      >
        <S.Jumbo>Composed Callstack</S.Jumbo>
        <S.SubmitButton onClick={submitCalls} disabled={encoding}>
          Submit All Calls
        </S.SubmitButton>
        <S.CardStack>
          {/*callStack.map((item, index) => {
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
                      <p>
                        {call.function.name + "("}
                        {call.function.inputs.map((item, index) => {
                          if(index != call.function.inputs.length -1 ){
                            return <span style={{color: "#5ebd6d"}}>{item.type}, </span>;
                          } else {
                            return <span style={{color: "#5ebd6d"}}>{item.type}</span>;
                          }
                          
                        })}
                        {")"}
                      </p>
                    </S.CardDetails>
                  );
                })}
              </S.Card>
            );
          })*/}
          {callStack.map((data, index) => {
            return data.callStack.map((call, index) => {
              return (
                <S.Card key={index}>
                  <S.CardTitle color="#70AED3">Call Data</S.CardTitle>
                  <S.CardTitle>{data.contract}</S.CardTitle>
                  <S.CardDetails>
                    {call.function.name + "("}
                    {call.function.inputs.map((item, index) => {
                      if (index != call.function.inputs.length - 1) {
                        return (
                          <span style={{ color: "#5ebd6d" }}>
                            {item.type},{" "}
                          </span>
                        );
                      } else {
                        return (
                          <span style={{ color: "#5ebd6d" }}>{item.type}</span>
                        );
                      }
                    })}
                    {")"}
                  </S.CardDetails>
                  <S.CardDetails>
                    [
                    {call.inputs.map((input, index) => {
                      if (index != call.inputs.length - 1) {
                        return (
                          <span style={{ color: "#53bd6d" }}>{input}, </span>
                        );
                      } else {
                        return (
                          <span style={{ color: "#53bd6d" }}>{input}</span>
                        );
                      }
                    })}
                    ]
                  </S.CardDetails>
                  <S.SendButton
                    onClick={() => {
                      sendSingleTx(call, data.contract);
                    }}
                  >
                    Send
                  </S.SendButton>
                </S.Card>
              );
            });
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
