import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    data: [],
  },
  reducers: {
    setSession: (state, respSession) => {
      state.data = respSesion.payload;
    },
    addSession: (state, respSession) => {
      state.data.push(respSession.payload);
    },
  },
});
export const { setSesion, addSession } = sessionSlice.actions;
export default sessionSlice.reducer;
