import React, { createContext, useContext, useReducer } from "react";

// This is Data Layer
export const StateContext = React.createContext();
// Yo chai Provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Yesari reducer use garne
export const useStateValue = () => useContext(StateContext);
