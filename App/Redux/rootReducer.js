// src/app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthReducer/authSlice";
import homeSlice from "./HomeReducer/homeSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  home: homeSlice,
});

export default rootReducer;
