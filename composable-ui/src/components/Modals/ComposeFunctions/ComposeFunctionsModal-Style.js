import styled from 'styled-components';
import {motion} from 'framer-motion';

export const FormCard = styled(motion.div)`
  margin-top: 150px;
  min-width: 550px;
  min-height: 400px;
  display: flex;
  background-color: #35aaf9;
  border-radius: 30px;
  flex-direction: column;
  margin-bottom: 30px;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  @media only screen and (max-width: 768px) {
    margin: 0 auto 20px auto;
  }
`;

export const FormTitle = styled.h1`
  color: black;
  text-align: center;
  font-size: 45px;
  font-family: "Cousine";
  margin: 40px 0px 10px 0px;
  padding: 0;
  font-weight: 100;
`;

export const InputWrappers = styled.div`
    display: flex;
    height: 40px;
`;


export const InputContainer = styled.div`
    display: block;
    height: 95px;
    width: 500px;
    border: 1px solid black;
    border-radius: 20px;
    align-self: center;
    margin: 0 auto 0 auto;
`;

export const InputLabel = styled.p`
    color: black;
    margin-left: 20px;
    opacity: 80%;
`;

export const InputError = styled.p`
    color: red;
    font-size: 14px;
    margin-left: 50px;
    display: ${props => props.error ? 'block' : 'none'};
`;

export const StyledInput = styled.input`
    background: transparent;
    border: none;
    outline: none;
    width: 450px;
    height: 30px;
    margin-left: 15px;
    color: black;
    font-size: 25px;
`;

export const StyledButton = styled.button`
    padding: 25px 40px;
    font-size: 1.5em;
    width: 80%;
    text-align: center;
    border-radius: 12px;
    outline: none;
    border: 1px solid transparent;
    text-decoration: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    background-color: #35aaf9;
    color: white;
    font-weight: 500;
    align-self: center;
    margin: auto 0px 10px 0px;
    font-family: 'Cousine';
    &:hover{
        background-color: white;
        color: #35aaf9;
    }
`;

export const LinkTo = styled.a`
    text-decoration: underline;
    cursor: pointer;
    color: red;
`;

export const TempContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;
