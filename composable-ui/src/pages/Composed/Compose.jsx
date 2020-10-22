import { Card } from "@material-ui/core";
import React from "react";
import * as S from "./Compose-Style.js";

const Compose = ({ callStack }) => {

  var callStack = [
    {
      contract: '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359',
      callStack: [
        {
          id: 1,
          function: {
            constant: true,
            inputs: {name: "newOwner", type: "address"},
            name: "transferOwnership",
            outputs: [],
            type: 'function'
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"]
        },
        {
          id: 1,
          function: {
            constant: true,
            inputs: {name: "newOwner", type: "address"},
            name: "notRealFunction",
            outputs: [],
            type: 'function'
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"]
        }
      ]  
    },
    {
      contract: '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359',
      callStack: [
        {
          id: 1,
          function: {
            constant: true,
            inputs: {name: "newOwner", type: "address"},
            name: "transferOwnership",
            outputs: [],
            type: 'function'
          },
          inputs: ["0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"]
        }
      ]  
    }
  ]

  const submitCalls = () => {
    //  
  }

  return (
    <S.Container  initial={{ opacity: "3%"}} animate={{opacity: "100%"}} transition={{duration: .8}} layout>
      <S.Jumbo>Composed Callstack</S.Jumbo>
      <S.SubmitButton onClick={submitCalls}>
        Submit Calls
      </S.SubmitButton>
      <S.CardStack>
        {
          callStack.map((item, index) => {
            return (
            <S.Card>
              <S.CardTitle color="#70AED3">Contract Address</S.CardTitle>
              <S.CardTitle>{item.contract}</S.CardTitle>
              <S.CardDetails>
                <p style={{color:'#70AED3'}}>Functions</p>
              </S.CardDetails>
              {
                item.callStack.map((call, index) => {
                  return (
                    <S.CardDetails>
                      <p>{call.function.name}</p>
                    </S.CardDetails>
                  )
                })
              }
            </S.Card>
            )
          })
        }
      </S.CardStack>
    </S.Container>
  );
};

export default Compose;
