import {
  getLocal,
  removeLocal,
  setLocal,
} from "../components/utils/Storage.js";

export const initAuth = {
  isLoggedIn: false,
  loading: false,
  isAdmin: false, //it is used to extension the roles management.
  error: null,
  token: null,
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
  let username = getLocal("username");
  return {
    ...initAuth,
    isLoggedIn: username !== null,
    username: username,
    isAdmin: username !== null && getLocal("isAdmin"),
  };
};

const success = (action) => {
  // setLocal("username", action.username);

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
  removeLocal("username");
};
