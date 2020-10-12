import styled from 'styled-components';


export const Container = styled.div`
    height: 100vh;
    background-color: black;
    margin: 0;
    padding: 0;
`;

export const Header = styled.h1`
    color: white;
`

export const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormCard = styled.div`
    min-width: 550px;
    min-height: 400px;
    display: block;
    background-color: #212429; 
    border-radius: 30px;
    justify-content: space-around;
    flex-direction: column;
`;

export const FormTitle = styled.h1`
    color: white;
    text-align: center;
    font-size: 45px;
    font-family: 'Poppins', sans-serif;
`;

export const InputWrappers = styled.div`
    display: flex;
`;


export const InputContainer = styled.div`
    display: block;
    height: 95px;
    width: 500px;
    border: 1px solid gray;
    border-radius: 30px;
    align-self: center;
    margin: 0 auto 0 auto;
`;

export const InputLabel = styled.p`
    color: white;
    margin-left: 20px;
    opacity: 50%;
`;

export const StyledInput = styled.input`
    background: transparent;
    border: none;
    outline: none;
    width: 450px;
    height: 30px;
    margin-left: 15px;
    color: white;
    font-size: 25px;
`;

export const StyledButton = styled.button`
    padding: 3px 10px 3px 10px;
    text-align: center;
    border-radius: 12px;
    outline: none;
    border: 1px solid transparent;
    text-decoration: none;
    cursor: pointer;
    background-color: rgba(21, 61, 111, 0.44);
    color: rgb(109, 168, 255);
    font-size: 16px;
    font-weight: 500;
    margin-right: 20px;
`;