// src/features/auth/authSlice.js
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    HabitTask:1,
    loginData:{},
    forgotEmail:'',
  },
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setHabitTask: (state, action) => {
      state.HabitTask = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setForgotEmail: (state, action) => {
      state.forgotEmail = action.payload;
    },
  },
});

export const {setLogin,setHabitTask,setLoginData,setForgotEmail} = authSlice.actions;
export default authSlice.reducer;
