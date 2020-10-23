import { Card } from "@material-ui/core";
import React from "react";
import * as S from "./Compose-Style.js";
import { getWeb3 } from "../../utils/common.js";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

const Compose = ({ callStack }) => {
  var web3;
  var account;

  const connectWallet = async () => {
    try {
      var web32 = await getWeb3();
      web3 = web32;
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];
      console.log("connected.");
    } catch {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
    }
  };
  var callStack = [
    {
      contract: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
      callStack: [
        {
          id: 1,
          function: {
            constant: true,
            inputs: { name: "newOwner", type: "address" },
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
            inputs: { name: "newOwner", type: "address" },
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
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
            inputs: { name: "newOwner", type: "address" },
            name: "transferOwnership",
            outputs: [],
            type: "function",
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"],
        },
      ],
    },
  ];

  const submitCalls = async () => {
    /*
    for (var data in callStack) {
      var callInfo = callStack[data];
      var contractAddress = callInfo.contract;
      var calls = callInfo.callStack;

      console.log({ contractAddress, calls });
    }

    await web3.eth.sendTransaction({
      from: account[0],
      to: "0xEe6170Ea31b014d479746A719A56ab7a3aF977ad",
      value: web3.utils.toBN(web3.utils.toWei("1", "ether")),
    });
    */
    console.log(web3);
  };

  return (
    <>
      <Header />
      <S.Container
        initial={{ opacity: "3%" }}
        animate={{ opacity: "100%" }}
        transition={{ duration: 0.8 }}
        layout
      >
        <S.Jumbo>Composed Callstack</S.Jumbo>
        <S.SubmitButton onClick={submitCalls}>Submit Calls</S.SubmitButton>
        <S.CardStack>
          {callStack.map((item, index) => {
            return (
              <S.Card>
                <S.CardTitle color="#70AED3">Contract Address</S.CardTitle>
                <S.CardTitle>{item.contract}</S.CardTitle>
                <S.CardDetails>
                  <p style={{ color: "#70AED3" }}>Functions</p>
                </S.CardDetails>
                {item.callStack.map((call, index) => {
                  return (
                    <S.CardDetails>
                      <p>{call.function.name}</p>
                    </S.CardDetails>
                  );
                })}
              </S.Card>
            );
          })}
        </S.CardStack>
      </S.Container>
    </>
  );
};

export default Compose;
