import { createHook } from "overmind-react";

//  overmind state
const state = {
  web3: null,
  account: null,
}

//  stateful actions
const actions = {
  //  set the web3 obj
  setWeb3: ({state}, value) => {
    state.web3 = value;
  },
  //  set the active account
  setAccount: ({state}, value) => {
    state.account = value;
  }
}

export const useOvermind = createHook();

const config = {
  state,
  actions
}

export default config;