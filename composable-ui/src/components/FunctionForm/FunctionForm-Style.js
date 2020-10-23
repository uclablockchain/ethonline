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
  color: white;
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


export const InputLabel = styled.p`
    color: white;
    margin-left: 20px;
    opacity: 80%;
`;



export const StyledButton = styled.button`
    padding: 18px;
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
    background-color: ${props => props.color} ;
    color: white;
    font-size: 16px;
    font-weight: 500;
    align-self: center;
    margin: auto 0px auto 0px;

    &:hover{
        background-color: rgba(21, 61, 111, 0.20)
    }
`;

export const EvenOut = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: auto;
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
