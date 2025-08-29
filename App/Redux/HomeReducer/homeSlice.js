// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    subcategoryId: 0,
    productId: 0,
    addressUserData: {},
    addToCartData: null,
    selectedLanguage: "USD",
    selectedOrderId: 0,
    deliveryStatus: "",
    totalPrice: 0,
    couponDetailData: null,
  },
  reducers: {
    setSubcategoryId: (state, action) => {
      state.subcategoryId = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setAddressUserData: (state, action) => {
      state.addressUserData = action.payload;
    },
    setAddToCartData: (state, action) => {
      state.addToCartData = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload;
    },
    setDeliveryStatus: (state, action) => {
      state.deliveryStatus = action.payload;
    },
    setTotalPrices: (state, action) => {
      state.totalPrice = action.payload;
    },
    setCouponDetailData: (state, action) => {
      state.couponDetailData = action.payload;
    },
  },
});

export const {
  setSubcategoryId,
  setProductId,
  setAddressUserData,
  setAddToCartData,
  setSelectedLanguage,
  setSelectedOrderId,
  setDeliveryStatus,
  setTotalPrices,
  setCouponDetailData,
} = homeSlice.actions;
export default homeSlice.reducer;
