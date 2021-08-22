import { AuthState } from "./constants";

export const setUser = (payload: { user: string; token: string }) => ({
  type: AuthState.SET_USER,
  payload,
});

export const logout = () => ({
  type: AuthState.LOGOUT,
});
