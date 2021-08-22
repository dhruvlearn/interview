import React, { useReducer, useContext, createContext } from "react";
import { AuthReducer, initialState } from "./reducer";

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext({});

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }: any): any => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
