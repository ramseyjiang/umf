import uniqid from "uniqid";
import { INIT, CREATE, UPDATE, DELETE, LIST } from "../utils/actions.js";

export const initState = {
  counter: 0,
  operate: INIT,
  user: {
    username: "",
    is_admin: false,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  listUsers: [],
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      return initUser(state, action);
    }
    case LIST: {
      return {
        ...state,
        counter: action.data.length,
        listUsers: action.data,
      };
    }
    case CREATE: {
      return createUser(state, action);
    }
    case UPDATE: {
      return updateUser(state, action);
    }
    case DELETE: {
      return deleteUser(state, action);
    }
    default:
      return state;
  }
};

const initUser = (state, action) => {
  return {
    ...state,
    user: action.user,
    operate: action.operate,
  };
};

const createUser = (state, action) => {
  return {
    counter: ++state.counter,
    user: { ...action.user, id: uniqid() },
    listUsers: [...state.listUsers, action.user],
  };
};

const deleteUser = (state, action) => {
  return {
    counter: state.counter - 1,
    user: action.user,
    listUsers: state.listUsers.filter((user) => {
      return user.id !== action.userId;
    }), //When fake data works, but async data is not???
  };
};

const updateUser = (state, action) => {
  return {
    counter: state.counter,
    user: action.user,
    listUsers: state.listUsers.map((user) => {
      return user.id === action.user.id ? action.user : user;
    }),
  };
};
