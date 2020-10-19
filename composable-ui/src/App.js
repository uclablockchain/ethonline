import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Selector from './components/Selector/Selector.jsx';
import Contracts from './pages/Contracts/Contracts.jsx';

import Test from './Test/Test.jsx';



function App() {

  //0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359
  return (
    <div>
      {
        <Test />
        //<Contracts />
      }
        
    </div>
    
  );
}

export default App;
