import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: '',
  },
  reducers: {
    setAuthenticated: (state, bool) => {
      state.isAuthenticated = bool;
    },
    setToken: (state, token) => {
      state.token = token;
    },
  },
});

export const getAuth = (state) => state.auth;

export const { setAuthenticated, setToken } = authSlice.actions;

export default authSlice.reducer;
