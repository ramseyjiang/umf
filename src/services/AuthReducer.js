import {
  getLocal,
  removeLocal,
  setLocal,
} from "../components/utils/Storage.js";

export const initAuth = {
  isLoggedIn: false,
  loading: false,
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
  let token = getLocal("token");
  return {
    ...initAuth,
    isLoggedIn: token !== null,
    token: token,
  };
};

const success = (action) => {
  setLocal("token", action.access_token);

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
};
