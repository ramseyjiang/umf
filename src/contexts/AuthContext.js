import React, {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  initAuth,
  authReducer,
  INIT,
  LOADING,
  SUCCESS,
  FAIL,
  LOGOUT,
} from "../services/AuthReducer";

import { get, post } from "../components/utils/Request";
const USER_API_URL = "http://13.210.14.131/um/public/index.php/api/";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initAuth);

  //The first time a user visits the website, it will only run once.
  //The other scenario, a user closed website without logout, after the user come back, it will auto login.
  useEffect(() => {
    if (state.username === null) {
      dispatch({ type: INIT });
    }
  }, [state.username]);

  const loading = () => dispatch({ type: LOADING });

  const register = useCallback(async (data) => {
    post("post", PROXY_URL + USER_API_URL + "register", data).then((result) => {
      if (result.status === "ok") {
        dispatch({ type: SUCCESS, data: result });
      } else {
        dispatch({ type: FAIL, error: result.errors });
      }
    });
  }, []);

  const login = useCallback(async (data) => {
    post("post", PROXY_URL + USER_API_URL + "login", data).then((result) => {
      if (result.status === "ok") {
        dispatch({ type: SUCCESS, data: result });
      } else {
        dispatch({ type: FAIL, error: result.errors });
      }
    });
  }, []);

  const logout = useCallback(() => {
    get(PROXY_URL + USER_API_URL + "logout").then((result) => {
      dispatch({ type: LOGOUT, data: result });
    });
  }, []);

  const authApi = useMemo(
    () => ({
      state,
      loading,
      logout,
      register,
      login,
    }),
    [logout, register, login, state]
  );

  return (
    <AuthContext.Provider value={{ authApi }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
