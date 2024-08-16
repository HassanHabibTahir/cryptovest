/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem("token");
const initialState = {
  themeMode: "dark",
  userDbData: null,
  isLoggedIn: false,
  tokenPrice: 0,
  userOrders: null,
  network: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeMode = action.payload;
    },
    setUserDbData: (state, { payload }) => {
      state.userDbData = payload;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setTokenPrice: (state, { payload }) => {
      state.tokenPrice = payload;
    },
    setUserOrders: (state, { payload }) => {
      state.userOrders = payload;
    },
    setNetwork: (state, { payload }) => {
      state.network = payload;
    },
  },
});

export const {
  changeTheme,
  setUserDbData,
  setIsLoggedIn,
  setTokenPrice,
  setUserOrders,
  setNetwork,
} = globalSlice.actions;

export const selectCurrentUser = (state) => state.global.user;
