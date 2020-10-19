import React, { useState } from 'react'
import * as S from './Contracts-Style.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import { GenericAPICall, getWeb3 } from '../../utils/common.js';
import Logo from '../../components/Logo/Logo.jsx';

//components
import ComposeFunctionsModal from '../../components/Modals/ComposeFunctions/ComposeFunctionsModal.jsx';

//  material ui
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const Contracts = () => {

    const [selectedFunction, setSelectedFunction] = React.useState('');
    const [modalToggle, toggleModal] = useState(false);
    const handleChange = (event) => {

        var selection = formData.functions[event.target.value];
        setFormData({ ...formData, composedFunctionJson: selection })
        setSelectedFunction(event.target.value);
    };

    const [formData, setFormData] = useState({
        loading: false,
        contractAddress: '',
        functions: [null],
        error: false,
        contractABI: null,
        composedFunctionJson: null,
        functionArguments: []
    });

    const getFunctions = () => {

        setFormData({ ...formData, loading: true })

        var apiConfig = {
            method: 'GET',
            url: ('https://api.etherscan.io/api?module=contract&action=getabi&address=' + formData.contractAddress + "&apikey=WJY1AAMZTEYBUTV776YCTYDI2HAQ38VU4W"),
            headers: {}
        }

        GenericAPICall(apiConfig,
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

    return (
        <S.Container>
            <Logo />
            <S.Body>
                <S.ComposeWrapper>
                    <S.StepWrapper>
                        <S.StepTitle>
                            Step 1: <br />Compose a Contract
                        </S.StepTitle>
                        <S.StepDescription>
                            Enter a contract address and click the generate functions button.
                            A new form will be generated with a list of functions you can call
                            from the contract.
                        </S.StepDescription>
                    </S.StepWrapper>
                    <S.FormCard>
                        <S.FormTitle>
                            Compose Contract
                        </S.FormTitle>
                        <S.InputContainer>
                            <S.InputLabel>
                                Contract Address
                            </S.InputLabel>
                            <S.InputWrappers>
                                <S.StyledInput placeholder="0x..."
                                    value={formData.contractAddress}
                                    onFocus={() => { setFormData({ ...formData, error: false }) }}
                                    onChange={(e) => { setFormData({ ...formData, contractAddress: e.target.value }) }} />
                            </S.InputWrappers>
                            <S.InputError error={formData.error}>
                                Error: Please enter a valid contract address. Visit <span><S.LinkTo href="https://etherscan.io/">Etherscan</S.LinkTo></span> for details.
                            </S.InputError>
                        </S.InputContainer>
                        {formData.loading &&
                            <LinearProgress style={{
                                margin: '80px 20px 0px 20px'
                            }} />
                        }
                        <S.StyledButton onClick={getFunctions} color="rgba(21, 61, 111, 0.44)">
                            Generate Functions
                        </S.StyledButton>
                    </S.FormCard>
                </S.ComposeWrapper>
                {formData.functions[0] !== null &&
                    <S.ComposeWrapper>
                        <S.StepWrapper>
                            <S.StepTitle>
                                Step 2: <br />Compose Functions
                        </S.StepTitle>
                            <S.StepDescription>
                                Configure functions to be called by the contract.
                        </S.StepDescription>
                        </S.StepWrapper>
                        <S.FormCard>
                            <S.FormTitle>
                                Compose Functions
                        </S.FormTitle>
                            <S.InputLabel>
                                Function
                            </S.InputLabel>
                            <S.TempContainer>
                                <Select
                                    value={selectedFunction}
                                    onChange={handleChange}
                                    variant={'outlined'}
                                    style={{ color: 'white', opacity: '80%', width: '80%' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        formData.functions.map((func, index) => {
                                            return <MenuItem value={index} key={index}>{func.name}</MenuItem>
                                        })
                                    }
                                </Select>
                                <p onClick={() => { toggleModal(true) }} style={{ color: 'white', cursor: 'pointer', fontFamily: 'Poppins' }}>{'</>'}</p>
                            </S.TempContainer>
                        </S.FormCard>
                    </S.ComposeWrapper>
                }
                <ComposeFunctionsModal 
                    modalToggle={modalToggle}
                    toggleModal={ (v) => { toggleModal(v)}}
                    formData={formData}
                />
            </S.Body>
        </S.Container>
    )
}

export default Contracts
