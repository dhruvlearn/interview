import { AuthState } from "./constants";

type AppState = {
  user: string;
  token: string;
  loading?: boolean;
  errorMessage?: string;
};

type Action = { type: string; payload: any };

let user = localStorage.getItem("user") ?? "";
let token = localStorage.getItem("token") ?? "";

export const initialState: AppState = {
  user,
  token,
  loading: true,
  errorMessage: "",
};

export const AuthReducer = (initialState: AppState, action: Action) => {
  switch (action.type) {
    case AuthState.SET_USER:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user);
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case AuthState.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...initialState,
        user: "",
        token: "",
      };

    // case "LOGIN_ERROR":
    //   return {
    //     ...initialState,
    //     loading: false,
    //     errorMessage: action.error,
    //   };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
