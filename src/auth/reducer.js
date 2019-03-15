const DEFAULT_STATE = {
  token: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: new Date().getTime() };

    case "LOGOUT":
      return { ...state, token: null };

    default:
      return state;
  }
};
