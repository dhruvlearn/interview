let user = localStorage.getItem("user") ?? "";
let token = localStorage.getItem("token") ?? "";

export const initialState = {
  user,
  token,
  loading: true,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user);
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
