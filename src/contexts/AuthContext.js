import React, {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { SUCCESS, FAIL, LOGOUT, LOADING, INIT } from "../utils/actions.js";
import { initAuth, authReducer } from "../services/AuthReducer";
import { BASE_REQUEST_URL } from "../utils/Urls";

import { get, post } from "../utils/Request";

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
    post("post", BASE_REQUEST_URL + "register", data).then((result) => {
      if (result.status === "ok") {
        dispatch({ type: SUCCESS, data: result });
      } else {
        dispatch({ type: FAIL, error: result.errors });
      }
    });
  }, []);

  const login = useCallback(async (data) => {
    post("post", BASE_REQUEST_URL + "login", data).then((result) => {
      if (result.status === "ok") {
        dispatch({ type: SUCCESS, data: result });
      } else {
        dispatch({ type: FAIL, error: result.errors });
      }
    });
  }, []);

  const logout = useCallback(() => {
    get(BASE_REQUEST_URL + "logout").then((result) => {
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
