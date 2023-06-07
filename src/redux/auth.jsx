import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    user: {
      id: null,
      email: null,
      password: null
    }
  },
  reducers: {
    signIn: (state, action) => {
      return { authenticated: true, user: action.payload }
    },
    signOut: (state, action) => {
      return {
        authenticated: false, user: {
          id: null,
          email: null,
          password: null
        }
      }
    }
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
