import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState: {
    data: [],
  },
  reducers: {
    setSession: (state, respSession) => {
      state.data = respSession.payload;
    },
    addSession: (state, respSession) => {
      state.data.push(respSession.payload);
    },
  },
});
export const getSessions = (state) => state.sessions.data;

export const { setSession, addSession } = sessionSlice.actions;
export default sessionSlice.reducer;
