import React, { useState } from 'react'
import * as S from './Contracts-Style.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import {GenericAPICall} from '../../utils/common.js';
import Logo from '../../components/Logo/Logo.jsx';
import SettingsCog from '../../icons/icons.js';

//  material ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: 'transparent',
      border: '1px solid #2B2E35',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


const Contracts = () => {

    const classes = useStyles();
    const [selectedFunction, setSelectedFunction] = React.useState('');
    const handleChange = (event) => {
      setSelectedFunction(event.target.value);
    };

    const [formData, setFormData] = useState({
        loading: false,
        contractAddress: '',
        functions: [null],
        error: false,
        contractABI: null
    });

    const getFunctions = () => {
    
        setFormData({...formData, loading: true})

        var apiConfig = {
            method: 'GET',
            url: ('https://api.etherscan.io/api?module=contract&action=getabi&address=' + formData.contractAddress + "&apikey=WJY1AAMZTEYBUTV776YCTYDI2HAQ38VU4W"),
            headers: {}
        }

        GenericAPICall(apiConfig, 
                        (res) => { 
                            var contractABI = ""
                            contractABI = JSON.parse(res.data.result);
                            console.log(res.data);
                            if(contractABI){

                                var functions = contractABI.filter(function(item) {
                                    return item.type === "function"
                                })

                                setFormData({...formData, contractABI: contractABI, functions: functions, loading: false})
                            }
                        }, 
                        (err) => { setFormData({...formData, error: true}); console.log(err)}
                        )
    }

    return (
        <S.Container>
            <Logo />
            <S.Body>
                <S.ComposeWrapper>
                    <S.StepWrapper>
                        <S.StepTitle>
                            Step 1: Compose a Contract
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
                                <S.StyledInput  placeholder="0x..."
                                                value={formData.contractAddress} 
                                                onFocus={()=>{setFormData({...formData, error: false})}} 
                                                onChange={ (e) => { setFormData({...formData, contractAddress: e.target.value})}} />
                            </S.InputWrappers>
                            <S.InputError error={formData.error}>
                                Error: Please enter a valid contract address. Visit <span><S.LinkTo href="https://etherscan.io/">Etherscan</S.LinkTo></span> for details.
                            </S.InputError>
                        </S.InputContainer>
                        {  formData.loading &&
                            <LinearProgress style={{
                                margin: '80px 20px 0px 20px'
                            }}/>
                        }
                        <S.StyledButton onClick={getFunctions} color="rgba(21, 61, 111, 0.44)">
                            Generate Functions
                        </S.StyledButton>
                    </S.FormCard>
                </S.ComposeWrapper>
                { formData.functions[0] !== null &&
                <S.ComposeWrapper>
                    <S.StepWrapper>
                        <S.StepTitle>
                            Step 2: Compose Functions
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
                                style={{ color: 'white', opacity: '80%', width: '80%'}}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        formData.functions.map((func, index) => {
                                            return <MenuItem value={func.name} key={index}>{func.name}</MenuItem>
                                        })
                                    }
                                </Select>
                                <SettingsCog />
                            </S.TempContainer>
                    </S.FormCard>
                </S.ComposeWrapper>

                }

            </S.Body>
        </S.Container>
    )
}

export default Contracts
