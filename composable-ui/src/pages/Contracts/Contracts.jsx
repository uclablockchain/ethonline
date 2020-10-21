import React, { useState } from "react";
import * as S from "./Contracts-Style.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GenericAPICall, getWeb3 } from "../../utils/common.js";
import Logo from "../../components/Logo/Logo.jsx";
//components
//  material ui

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FunctionForm from "../../components/FunctionForm/FunctionForm.jsx";
import { formatMs } from "@material-ui/core";

const Contracts = () => {
  const [calls, setCalls] = useState([]);
  const [selectedFunction, setSelectedFunction] = React.useState("");
  const [modalToggle, toggleModal] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
	const [functionForms, setForms] = useState([]);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
	};
	
	const loadCallStack = (call) => {
		var x = [...calls];
		x[call.id-1] = call;
		setCalls(x);

		setSnackOpen(true);
	}

  const [formData, setFormData] = useState({
    loading: false,
    contractAddress: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
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
    console.log(formData.functions[selectedFunction].name);
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
					setForms([1])
        }
      },
      (err) => {
        setFormData({ ...formData, error: true });
        console.log(err);
      }
    );
  };

  return (
    <S.Container>
      <Logo />
      <S.Body>
        <S.ComposeWrapper>
          <S.StepWrapper>
            <S.StepTitle>
              Step 1: <br />
              Compose a Contract
            </S.StepTitle>
            <S.StepDescription>
              Enter a contract address and click the generate functions button.
              A new form will be generated with a list of functions you can call
              from the contract.
            </S.StepDescription>
          </S.StepWrapper>
          <S.FormCard>
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
            <S.StyledButton
              onClick={getFunctions}
              color="rgba(21, 61, 111, 0.44)"
            >
              Generate Functions
            </S.StyledButton>
          </S.FormCard>
        </S.ComposeWrapper>
        {formData.functions[0] !== null && (
					<>
					{functionForms.map((func, index) => {
						return <FunctionForm functions={formData.functions} stepId={functionForms[index]} addToCallStack={loadCallStack}/>
					})}
					<S.FloatingButton onClick={() => {setForms([...functionForms, functionForms.length + 1])}} layout>
					Add Another Function
				</S.FloatingButton>
				</>
        )}

        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
          <Alert onClose={handleClose} severity="success">
            Function added to Composer.
          </Alert>
        </Snackbar>
      </S.Body>
    </S.Container>
  );
};

export default Contracts;
