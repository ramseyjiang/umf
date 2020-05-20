import { getLocal, removeLocal, setLocal } from "../utils/Storage.js";

import { SUCCESS, FAIL, LOGOUT, LOADING, INIT } from "../utils/actions.js";

export const initAuth = {
  isLoggedIn: false,
  loading: false,
  error: null,
  token: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case INIT:
      return initAccess();
    case LOADING:
      return { ...state, loading: true };
    case SUCCESS:
      return success(action);
    case FAIL:
      return failure(action);
    case LOGOUT:
      return logout();
    default:
      return state;
  }
}

const initAccess = () => {
  let token = getLocal("token");
  return {
    ...initAuth,
    isLoggedIn: token !== null,
    token: token,
  };
};

const success = (action) => {
  setLocal("token", action.data.access_token);
  setLocal("isAdmin", action.data.isAdmin);

  return {
    ...initAuth,
    isLoggedIn: true,
    token: action.data.access_token,
  };
};

const failure = (action) => {
  removeUser();
  return { ...initAuth, error: action.error };
};

const logout = () => {
  removeUser();
  return { ...initAuth };
};

const removeUser = () => {
  removeLocal("token");
  setLocal("isAdmin");
};
