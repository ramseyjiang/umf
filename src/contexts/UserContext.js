import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import {
  initState,
  userReducer,
  INIT,
  CREATE,
  UPDATE,
  DELETE,
  LIST,
} from "../services/UserReducer";
import { request } from "../components/utils/Request";

const USER_API_URL = "http://13.210.14.131/um/public/index.php/api/";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  const initUser = useCallback((user) => {
    return dispatch({ type: INIT, user: initState.user, operate: CREATE });
  }, []);

  const getUserList = useCallback(() => {
    request("get", PROXY_URL + USER_API_URL + "list").then((result) => {
      dispatch({ type: LIST, data: result });
    });
  }, []);

  const editUser = useCallback((user) => {
    return dispatch({ type: INIT, user: user, operate: UPDATE });
  }, []);

  const createUser = useCallback((user) => {
    request("post", PROXY_URL + USER_API_URL + "create", user).then(
      (result) => {
        request("get", PROXY_URL + USER_API_URL + "list").then((result) => {
          dispatch({ type: LIST, data: result });
        });
      }
    );
  }, []);

  const updateUser = useCallback((user) => {
    request("put", PROXY_URL + USER_API_URL + "update/" + user.id, user).then(
      (result) => {
        return dispatch({ type: UPDATE, user: user });
      }
    );
  }, []);

  const deleteUser = useCallback((userId) => {
    request("delete", PROXY_URL + USER_API_URL + "delete/" + userId).then(
      (result) => {
        return dispatch({ type: DELETE, data: result });
      }
    );
  }, []);

  const userApi = useMemo(
    () => ({
      state,
      initUser,
      editUser,
      createUser,
      deleteUser,
      updateUser,
      getUserList,
    }),
    [state, initUser, editUser, createUser, deleteUser, updateUser, getUserList]
  );

  return (
    <UserContext.Provider value={{ userApi }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
