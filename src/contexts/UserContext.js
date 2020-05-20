import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { initState, userReducer } from "../services/UserReducer";
import { INIT, CREATE, UPDATE, DELETE, LIST } from "../utils/actions.js";
import { get, post } from "../utils/Request";
import { BASE_REQUEST_URL } from "../utils/Urls";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  const initUser = useCallback((user) => {
    return dispatch({ type: INIT, user: initState.user, operate: CREATE });
  }, []);

  const getUserList = useCallback(() => {
    get(BASE_REQUEST_URL + "list").then((result) => {
      dispatch({ type: LIST, data: result });
    });
  }, []);

  const editUser = useCallback((user) => {
    return dispatch({ type: INIT, user: user, operate: UPDATE });
  }, []);

  const createUser = useCallback((user) => {
    post("post", BASE_REQUEST_URL + "create", user).then((result) => {
      get(BASE_REQUEST_URL + "list").then((result) => {
        dispatch({ type: LIST, data: result });
      });
    });
  }, []);

  const updateUser = useCallback((user) => {
    post("put", BASE_REQUEST_URL + "update/" + user.id, user).then(
      (result) => {
        return dispatch({ type: UPDATE, user: user });
      }
    );
  }, []);

  const deleteUser = useCallback((userId) => {
    post("delete", BASE_REQUEST_URL + "delete/" + userId).then(
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
