import React, { useState, useEffect } from "react";
import * as S from "./Contracts-Style.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GenericAPICall, getWeb3 } from "../../utils/common.js";
import Header from '../../components/Header/Header.jsx';
//components
//  material ui

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FunctionForm from "../../components/FunctionForm/FunctionForm.jsx";

const Contracts = ({ updateCallStack }) => {
  const [calls, setCalls] = useState([]);
  const [selectedFunction, setSelectedFunction] = React.useState("");
  const [modalToggle, toggleModal] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [functionForms, setForms] = useState([]);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const loadCallStack = (call) => {
    var x = [...calls];
    x[call.id - 1] = call;
    setCalls(x);

    setSnackOpen(true);

    updateCallStack(formData.contractAddress, call);
  };

  const [formData, setFormData] = useState({
    loading: false,
    contractAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
    functions: [null],
    error: false,
    contractABI: null,
    composedFunctionJson: null,
    functionArguments: [],
  });

  const composeFunctionCall = (inputArray) => {
    toggleModal(false);
    let id = calls.length;
    var newCall = {
      id,
      function: formData.functions[selectedFunction],
      inputs: inputArray,
    };
    setCalls([...calls, newCall]);
    setSnackOpen(true);
  };

  const getFunctions = () => {
    setFormData({ ...formData, loading: true });

    var apiConfig = {
      method: "GET",
      url:
        "https://api.etherscan.io/api?module=contract&action=getabi&address=" +
        formData.contractAddress +
        "&apikey=WJY1AAMZTEYBUTV776YCTYDI2HAQ38VU4W",
      headers: {},
    };

    GenericAPICall(
      apiConfig,
      (res) => {
        var contractABI = "";
        contractABI = JSON.parse(res.data.result);
        if (contractABI) {
          var functions = contractABI.filter(function (item) {
            return item.type === "function";
          });

          setFormData({
            ...formData,
            contractABI: contractABI,
            functions: functions,
            loading: false,
          });
          setForms([1]);
        }
      },
      (err) => {
        setFormData({ ...formData, error: true });
        console.error(err);
      }
    );
  };

  return (
    <>
    {//<Header />
    }
    <S.Container>
      <S.FormCard initial={{opacity: 0, y: 1000}} transition={{opacity: 1, y: 0, duration: 0.5}} animate={{opacity: 1, y: 0, duration: 0.5}} layout>
        <S.FormTitle>Compose Contract</S.FormTitle>
        <S.InputContainer>
          <S.InputLabel>Contract Address</S.InputLabel>
          <S.InputWrappers>
            <S.StyledInput
              placeholder="0x..."
              value={formData.contractAddress}
              onFocus={() => {
                setFormData({ ...formData, error: false });
              }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  contractAddress: e.target.value,
                });
              }}
            />
          </S.InputWrappers>
          <S.InputError error={formData.error}>
            Error: Please enter a valid contract address. Visit{" "}
            <span>
              <S.LinkTo href="https://etherscan.io/">Etherscan</S.LinkTo>
            </span>{" "}
            for details.
          </S.InputError>
        </S.InputContainer>
        {formData.loading && (
          <LinearProgress
            style={{
              margin: "80px 20px 0px 20px",
            }}
          />
        )}
        <S.StyledButton onClick={getFunctions} color="#F0FFF0">
          Generate Functions
        </S.StyledButton>
      </S.FormCard>
      {formData.functions[0] !== null && (
        <>
          {functionForms.map((func, index) => {
            return (
              <FunctionForm
                functions={formData.functions}
                stepId={functionForms[index]}
                addToCallStack={loadCallStack}
                key={index + formData.contractAddress}
              />
            );
          })}

          <S.BottomButtonWrapper>
            <S.FloatingButton
              onClick={() => {
                setForms([...functionForms, functionForms.length + 1]);
              }}
              layout
            >
              Add Another Function
            </S.FloatingButton>
            <S.LinkWrapper to="/Composer">
              <S.FloatingButton layout>Finalize</S.FloatingButton>
            </S.LinkWrapper>
          </S.BottomButtonWrapper>
        </>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          Function added to Composer.
        </Alert>
      </Snackbar>
    </S.Container>
    </>
  );
};

export default Contracts;
