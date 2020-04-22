import React, {
    createContext,
    useReducer,
    useContext,
    useCallback,
    useMemo
  } from "react";
  import {
    initState,
    userReducer,
    INIT,
    CREATE,
    UPDATE,
    DELETE
  } from "../services/UserReducer";
  
  const UserContext = createContext();
  
  const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initState);

    const initUser = useCallback(
      user => {
        return dispatch({ type: INIT, user: initState.user, operate: CREATE });
      },
      []
    );

    const editUser = useCallback(
      user => {
        return dispatch({ type: INIT, user: user, operate: UPDATE });
      },[]
    );
  
    const createUser = useCallback( user => {
      //todo async to backend
      return dispatch({ type: CREATE, user: user })
    }, []);

    const updateUser = useCallback(user =>{ 
      //todo async to backend
      return dispatch({ type: UPDATE, user: user })
    }, []);
  
    const deleteUser = useCallback( userId => { 
      //todo async to backend
      return dispatch({ type: DELETE, userId: userId })
    }, []);
  
    const userApi = useMemo(
      () => ({ state, initUser, editUser, createUser, deleteUser, updateUser }),
      [state, initUser, editUser, createUser, deleteUser, updateUser]
    );
  
    return (
      <UserContext.Provider value={{ userApi }}>{children}</UserContext.Provider>
    );
  };
  
  export const useUserContext = () => {
    return useContext(UserContext);
  };
  
  export default UserContextProvider;
  