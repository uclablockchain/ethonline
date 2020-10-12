import React, { useState } from 'react'
import * as S from './Contracts-Style.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import {GenericAPICall} from '../../utils/common';


const Contracts = () => {

    const [formData, setFormData] = useState({
        loading: false,
        contractAddress: '',
        functions: null,
        error: false
    });

    const getFunctions = () => {

        var apiConfig = {
            method: 'GET',
            url: ('https://api.etherscan.io/api?module=contract&action=getabi&address=' + formData.contractAddress + "&apikey=WJY1AAMZTEYBUTV776YCTYDI2HAQ38VU4W"),
            headers: {}
        }

        GenericAPICall(apiConfig, 
                        (res) => { 
                            var contractABI = "";
                            contractABI = JSON.parse(res.data);
                            if(contractABI !== ''){
                                console.log(contractABI);
                            } else {
                                console.error('error parsing api result');
                            }
                        }, 
                        (err) => { setFormData({...formData, error: true}); console.log(err)}
                        )
    }

    return (
        <S.Container>
            <S.Header>
                Composable
            </S.Header>
            <S.Body>
                <S.FormCard>
                    <S.FormTitle>
                        Compose Contract
                    </S.FormTitle>
                    <S.InputContainer>
                       <S.InputLabel>
                            Contract Address
                        </S.InputLabel>
                        <S.InputWrappers>
                            <S.StyledInput placeholder="0x..." value={formData.contractAddress} onChange={ (e) => { setFormData({...formData, contractAddress: e.target.value })}} />
                            <S.StyledButton onClick={getFunctions}>
                                Get Functions
                            </S.StyledButton>
                        </S.InputWrappers>
                    </S.InputContainer>
                    {  formData.loading &&
                        <LinearProgress style={{
                            margin: '80px 20px 0px 20px'
                        }}/>
                    }

                </S.FormCard>
            </S.Body>
        </S.Container>
    )
}

export default Contracts
