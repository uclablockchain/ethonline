import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0;
  padding-bottom: 100px;
  background-color: transparent;
`;

export const Header = styled.h1`
  color: white;
`;

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

export const InputContainer = styled.div`
  display: block;
  height: 95px;
  width: 500px;
  border: 1px solid white;
  border-radius: 15px;
  align-self: center;
  margin: 0 auto 0 auto;
`;

export const InputLabel = styled.p`
  color: white;
  margin-left: 20px;
  opacity: 80%;
`;

export const InputError = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  display: ${(props) => (props.error ? "block" : "none")};
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
  background-color: ${(props) => props.color};
  color: #35aaf9;
  font-family: "Cousine";
  font-size: 2rem;
  font-weight: 500;
  align-self: center;
  margin: auto 0px auto 0px;

  &:hover {
    background-color: #F5FFFA;
  }
`;

export const LinkTo = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: red;
`;

export const FloatingButton = styled(motion.button)`
  height: 100px;
  width: 300px;
  background-color: rgba(21, 61, 111, 0.44);
  border-radius: 30px;
  border-style: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  margin: 0 50px;
  outline: none;
`;

export const LinkWrapper = styled(Link)`
  margin: 0;
  padding: 0;
`;

export const BottomButtonWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
