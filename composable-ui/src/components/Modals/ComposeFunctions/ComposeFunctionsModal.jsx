import React, { useState } from "react";
import Modal from "react-modal";
import { checkTypes } from "../..//../utils/common.js";
import * as S from "./ComposeFunctionsModal-Style.js";

Modal.setAppElement("#root");
const ComposeFunctionsModal = ({singleFunction, modalIsOpen, modalFunction, returnFunction}) => {
  var singFunction = singleFunction;
  const [inputs, setInputs] = useState([]);
  const [err, setErr] = useState([]);

  const checkAndSubmitForm = async () => {
    //checktypes(type, input);
    var errs = [];
    for(var i in inputs) {
      var type = singFunction.inputs[i].type;
      var input = inputs[i];
      if(checkTypes(type, input) == false){
        errs[i] = true;
      };
      setErr(errs);
    }
    if(errs.length == 0) {
      returnFunction(inputs);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        modalFunction();
      }}
      style={{
        overlay: {
          
        },
        content: {
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#212429",
          minHeight: "100px",
          maxWidth: "40%",
          minWidth: "30%",
          borderRadius: "30px",
          borderColor: "transparent",
          margin: "auto",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {singleFunction && 
          <S.FormTitle>
            {singleFunction.name} <br /> <span style={{fontSize: '20px'}}>Function Inputs</span>
          </S.FormTitle>

      } 
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "5px",
          }}
        >
          {singleFunction != null &&
            singleFunction.inputs.map((item, index) => {
              return (
                <div key={index}>
                  <S.InputContainer style={{ margin: "10px" }}>
                    <S.InputLabel>
                      {item.name} - {item.type}
                    </S.InputLabel>
                    <S.InputWrappers>
                      <S.StyledInput
                        value={inputs[index] == undefined ? "" : inputs[index]}
                        onChange={(e) => {
                          var x = [...inputs];
                          x[index] = e.target.value;
                          setInputs(x);
                        }}
                        onFocus={() => {
                          var x = [...err];
                          x[index] = false;
                          setErr(x);
                        }}
                      />
                    </S.InputWrappers>
                  </S.InputContainer>
                  <S.InputError error={err[index]}>Invalid Input.</S.InputError>
                </div>
              );
            })}
        </div>
        <S.StyledButton
          onClick={checkAndSubmitForm}
          color="rgba(21, 61, 111, 0.44)"
        >
          Add to Composer
        </S.StyledButton>
      </div>
    </Modal>
  );
};

export default ComposeFunctionsModal;
