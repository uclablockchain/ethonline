import React, {useState} from "react";
import * as S from "./FunctionForm-Style.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ComposeFunctionsModal from "../Modals/ComposeFunctions/ComposeFunctionsModal.jsx";


const FunctionForm = ({functions, stepId, addToCallStack}) => {

  var fx = functions;
  const [selection, setSelection] = useState("");
  const [modalToggle, toggleModal] = useState(false);

  const toggModal = () => {
    toggleModal(!modalToggle);
  }

  const selectionChange = (e) => {
    setSelection(e.target.value);
  }

  const getInputValues = (inputValues) => {
    var call = {
      id: stepId,
      function: fx[selection],
      inputs: inputValues
    }
    addToCallStack(call);
    toggleModal();
  }

  return (
    <S.ComposeWrapper initial={{x:1000}} animate={{x: 0}} transition={{duration: .5}} layout>
    <S.StepWrapper>
      <S.StepTitle>
        Step {stepId + 1}: <br />
        Compose {stepId+1 > 2 ? ' more' : ''} Functions 
      </S.StepTitle>
      <S.StepDescription>
        Configure functions to be called by the contract.
      </S.StepDescription>
    </S.StepWrapper>
    <S.FormCard>
      <S.FormTitle>Compose Function</S.FormTitle>
      <S.EvenOut>
      <S.InputLabel>Function</S.InputLabel>
      <S.TempContainer>
        <Select
          value={selection}
          onChange={selectionChange}
          variant={"outlined"}
          style={{ color: "white", opacity: "80%", width: "80%" }}
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
          disabled={selection==""}
          style={{
            color: "white",
            cursor: selection == "" ? "default" : "pointer",
            fontFamily: "Poppins",
            backgroundColor: 'transparent',
            borderStyle: 'none'
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
  </S.ComposeWrapper>
  );
};

export default FunctionForm;
