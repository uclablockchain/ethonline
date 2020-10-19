import React from 'react';
import Modal from 'react-modal';
import * as S from './ComposeFunctionsModal-Style.js';

Modal.setAppElement('#root')
const ComposeFunctionsModal = (props) => {

    const callEth = async () => {
        
    }

    return (
        <Modal isOpen={props.modalToggle}
            onRequestClose={() => { props.toggleModal(false) }}
            style={{
                overlay: {
                    backgroundColor: '#2B3341',
                    opacity: '98%'
                },
                content: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#212429',
                    minHeight: '300px',
                    maxWidth: '50%',
                    minWidth: '30%',
                    borderRadius: '30px',
                    borderColor: 'transparent',
                    margin: 'auto'
                }
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>


                {props.formData.composedFunctionJson != null &&
                    <S.FormTitle>{props.formData.composedFunctionJson.name} <br /> Function Inputs</S.FormTitle>
                }
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '5px' }}>


                    {props.formData.composedFunctionJson != null &&
                        props.formData.composedFunctionJson.inputs.map((item, index) => {

                            return (
                                <S.InputContainer style={{ margin: '10px' }}>
                                    <S.InputLabel>
                                        {item.name} - {item.type}
                                    </S.InputLabel>
                                    <S.InputWrappers>
                                        <S.StyledInput
                                        //value={formData.contractAddress} 
                                        //onFocus={()=>{setFormData({...formData, error: false})}} 
                                        //onChange={ (e) => { setFormData({...formData, contractAddress: e.target.value})}} 
                                        />
                                    </S.InputWrappers>
                                    <S.InputError //error={formData.error}
                                    >
                                        Error: Please enter a valid input. Visit <span><S.LinkTo href="https://etherscan.io/">Etherscan</S.LinkTo></span> for details.
                                            </S.InputError>
                                </S.InputContainer>
                            )
                        })

                    }
                </div>
                <S.StyledButton onClick={callEth} color="rgba(21, 61, 111, 0.44)">
                    Call
                </S.StyledButton>
            </div>
        </Modal>
    )
}

export default ComposeFunctionsModal
