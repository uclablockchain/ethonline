import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Selector from './components/Selector/Selector.jsx';
import Contracts from './pages/Contracts/Contracts.jsx';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Poppins');
  body {
    font-family: 'Poppins', sans-serif;
  }
`

function App() {

  //0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359
  return (
    <div>
        <GlobalStyles />
        <Contracts />
    </div>
    
  );
}

export default App;
