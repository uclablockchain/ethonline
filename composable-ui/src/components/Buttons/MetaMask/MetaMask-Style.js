import styled, {keyframes} from 'styled-components'

const breatheAnimation = keyframes`
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
    }
    
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(255, 121, 63, 0);
    }
    
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
    }
`

export const WalletButton = styled.button`
  margin-left: auto;
  border-style: none;
  outline: none;
  color: white;
  background: #f46b45; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #eea849,
    #f46b45
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #eea849,
    #f46b45
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding: 15px 25px;
  border-radius: 15px;
  font-size: 1.5rem;
  margin-right: 15px;
  cursor: pointer;
  align-self: flex-end;
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: ${props => props.loading};
`;


