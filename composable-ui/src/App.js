import React, { useState } from "react";
import "./App.css";
import Contracts from "./pages/Contracts/Contracts.jsx";
import Compose from "./pages/Composed/Compose.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header.jsx";

/*  Structure of a CallStack
  | Array
  | - Call Stack Object
  | ---- Contract Address
  | ---- Array of Objects which include id, functionABI, inputs

  In order to push to global state, we prop drill the function down.
  We send the parent function the contract address we want to edit
  along with the call to add to it.

*/
function App() {
  const [calls, setCalls] = useState([]);

  const updateCalls = (contractAddress, newCalls) => {
    //var x = calls;

    var newCall = {
      contract: contractAddress,
      callStack: newCalls
    }
    /*
    //  no calls added yet. create a new one
    if (x.length == 0) {
      var newData = {
        callStack: [call],
      };
      x.push(newData);
    } else {
      var added = false;
      //  check if this is an existing call, or a new call
      for (var i in x) {
        //  handle the existing case
        if (x[i].contract == contractAddress) {
          added = true;
          x[i].callStack.push(call);
          break;
        }
      }
      //  handle the non existing case
      if (added == false) {
        var newData = {
          contract: contractAddress,
          callStack: [call],
        };
        //  add the new contract stack to state
        x.push(newData);
      }
    }
    */
    //  finally, update the state.
    setCalls([...calls, newCall]);

  };

  //0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/Composer">
            <Compose callStack={calls} />
          </Route>
          <Route exact path="/Builder">
            <Contracts updateCallStack={updateCalls} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
