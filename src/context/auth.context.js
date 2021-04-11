import { useContext, createContext, useReducer } from "react";
import jwt from "jsonwebtoken";

const authContext = createContext();

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: jwt.decode(action.payload.token.split(" ")[1]),
        isLoggedIn: true,
      };
    case actionTypes.LOGOUT:
      return { ...state, user: undefined, isLoggedIn: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  // setup
  const token = localStorage.getItem("authToken");
  const user = token ? jwt.decode(token.split(" ")[1]) : undefined;
  const [authState, authDispatch] = useReducer(authReducer, {
    user: user,
    isLoggedIn: user ? true : false,
  });
  //functions ie actions
  const actions = {
    login: (token) => {
      localStorage.setItem("authToken", token);
      authDispatch({
        type: actionTypes.LOGIN,
        payload: { token: token },
      });
    },
    logout: () => {
      localStorage.removeItem("authToken");
      authDispatch({ type: actionTypes.LOGOUT });
    },
  };
  //memo
  const value = { authState, authDispatch, actions };
  //render
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
