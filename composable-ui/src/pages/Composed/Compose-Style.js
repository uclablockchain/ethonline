import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
`;

export const Jumbo = styled.h1`
  display: flex;
  width: fit-content;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  color: #70AED3;
  font-weight: normal;
  font-family: 'Cousine';
  font-size: 65px;
`;

export const CardStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 50rem;
  margin: 0 auto 0 auto;
  justify-content: space-around;
`;

export const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-width: 400px;
  min-height: 200px;
  border-radius: 20px;
  background-color: white;
  color: black;
  margin: 50px 25px 50px 25px;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, .1);
  transition: all 0.3s ease 0s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4rem 8rem rgba(0, 0, 0, .2);
  }
`;

export const CardTitle = styled.h1`
  color: ${props => props.color || 'black'};
  font-size: 12px;
  align-self: center;
  font-family: 'Cousine';

`;

export const CardDetails = styled.div`
  margin-left: 15px;
  font-family: 'Cousine';
  &:last-child {
    margin-bottom: 15px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #5EbD6D;
  padding: 20px 16px;
  border-style: none;
  border-radius: 20px;
  color: white;
  font-family: 'Cousine';
  display: flex;
  margin: 0 auto 0 auto;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  outline: none;
  &:hover {
    transform: translateY(-7px)
  }
`;