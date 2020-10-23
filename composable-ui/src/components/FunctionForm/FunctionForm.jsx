import React, { useState } from "react";
import * as S from "./FunctionForm-Style.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ComposeFunctionsModal from "../Modals/ComposeFunctions/ComposeFunctionsModal.jsx";

const FunctionForm = ({ functions, stepId, addToCallStack }) => {
  var fx = functions;
  const [selection, setSelection] = useState("");
  const [modalToggle, toggleModal] = useState(false);

  const toggModal = () => {
    toggleModal(!modalToggle);
  };

  const selectionChange = (e) => {
    setSelection(e.target.value);
  };

  const getInputValues = (inputValues) => {
    var call = {
      id: stepId,
      function: fx[selection],
      inputs: inputValues,
    };
    addToCallStack(call);
    toggleModal();
  };

  return (
    <>
      <S.FormCard  layout>
        <S.FormTitle>Compose Function</S.FormTitle>
        <S.EvenOut>
          <S.InputLabel>Function</S.InputLabel>
          <S.TempContainer>
            <Select
              value={selection}
              onChange={selectionChange}
              variant={"outlined"}
              style={{ color: "white", opacity: "99%", width: "80%" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {functions.map((func, index) => {
                return (
                  <MenuItem value={index} key={index}>
                    {func.name}
                  </MenuItem>
                );
              })}
            </Select>
            <button
              onClick={() => {
                toggleModal(true);
              }}
              style={{
                color: "white",
                opacity: selection == "" ? "50%" : "100%",
                cursor: selection == "" ? "default" : "pointer",
                fontFamily: "Cousine",
                backgroundColor: "transparent",
                borderStyle: "none",
                outline: "none",
              }}
            >
              {"edit"}
            </button>
          </S.TempContainer>
        </S.EvenOut>
      </S.FormCard>
      <ComposeFunctionsModal
        singleFunction={functions[selection]}
        modalIsOpen={modalToggle}
        modalFunction={toggModal}
        returnFunction={getInputValues}
      />
    </>
  );
};

export default FunctionForm;
