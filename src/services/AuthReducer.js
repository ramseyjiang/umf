import {
  getLocal,
  removeLocal,
  setLocal,
} from "../components/utils/Storage.js";

export const initAuth = {
  isLoggedIn: false,
  loading: false,
  username: null,
  isAdmin: false, //it is used to extension the roles management.
  error: null,
};

// Actions
export const SUCCESS = "SUCCESS";
export const FAIL = "FAIL";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";
export const INIT = "INIT";

export function authReducer(state, action) {
  switch (action.type) {
    case INIT:
      return initAccess();
    case LOADING:
      return { ...state, loading: true };
    case SUCCESS:
      return loginSuccess(action);
    case FAIL:
      return loginFailure(action);
    case LOGOUT:
      return logout();
    default:
      return state;
  }
}

const initAccess = () => {
  let username = getLocal("username");
  return {
    ...initAuth,
    isLoggedIn: username !== null,
    username: username,
    isAdmin: username !== null && getLocal("isAdmin"),
  };
};

const loginSuccess = (action) => {
  setLocal("username", action.username);
  setLocal("isAdmin", action.isAdmin);

  return {
    ...initAuth,
    isLoggedIn: true,
    username: action.username,
    isAdmin: action.isAdmin,
  };
};

const loginFailure = (action) => {
  removeUser();
  return { ...initAuth, error: action.error };
};

const logout = () => {
  removeUser();
  return { ...initAuth };
};

const removeUser = () => {
  removeLocal("username");
  removeLocal("isAdmin");
};
