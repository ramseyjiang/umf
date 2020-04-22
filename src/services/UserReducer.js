// Actions
export const INIT = "INIT";
export const CREATE = "CREATE";
export const DELETE = "DELETE";
export const UPDATE = "UPDATE";

export const initState = {
  counter: 0,
  operate: INIT,
  user: {
    username: '',
    isAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  listUsers: [
    {
      id:1,
      username: 'ramsey',
      isAdmin: false,
      firstName: 'dawei',
      lastName: 'jiang',
      email: '123@qq.com',
      password: '123456'
    },
  ],
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      return initUser(state, action);
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
    operate: action.operate
  };
}

const createUser = (state, action) => {
  return {
    counter: ++state.counter,
    user: action.user,
    listUsers: [...state.listUsers, action.user]
  };
};

const deleteUser = (state, action) => {
  return {
    counter: state.counter - 1,
    user: action.user,
    listUsers: state.listUsers.filter((user) => {
      return user.id !== action.userId;
    }),
  };
};

const updateUser = (state, action) => {
  return {
    counter: state.counter,
    user: action.user,
    listUsers: state.listUsers.map(user => {
      return (user.id === action.user.id) ? action.user : user;
    })
  };
};
