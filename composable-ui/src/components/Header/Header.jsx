import React from 'react'
import * as S from './Header-Style.js';
import {Link} from 'react-router-dom';
import MetaMaskButton from '../Buttons/MetaMask/MetaMaskButton.jsx';

const Header = () => {
  return (
    <S.Header onClick={()=>{console.log('test!')}}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <S.HeaderItem>
          Home
        </S.HeaderItem>
      </Link>
      <Link to="/Builder" style={{ textDecoration: "none" }}>
        <S.HeaderItem>
          Build
        </S.HeaderItem>
      </Link>
      <MetaMaskButton onClick={()=>{console.log('test1')}}/>
    </S.Header>
  )
}

export default Header
