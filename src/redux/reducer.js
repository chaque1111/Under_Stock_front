import {createSlice} from "@reduxjs/toolkit";
const initialState = {
  products: [],
  productsCopy: [],
  productDetail: {},
  colors: [],
  sizes: [],
  user: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
      state.productsCopy = action.payload;
    },
    cleanProducts: (state, action) => {
      state.products = [];
      state.productsCopy = [];
    },
    searchProduct: (state, action) => {
      state.products = action.payload;
      state.productsCopy = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    refreshProduct: (state, action) => {
      state.productDetail = {};
    },
    getAllColors: (state, action) => {
      state.colors = action.payload;
    },
    getAllSizes: (state, action) => {
      state.sizes = action.payload;
    },
    filterProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteFilters: (state) => {
      state.colors = [];
      state.sizes = [];
    },
    logIn: (state, action) => {
      state.user = action.payload;
    },
    cleanUser: (state) => {
      state.user = {};
    },
  },
});

export const {
  cleanUser,
  logIn,
  getProductDetail,
  deleteFilters,
  getAllColors,
  getAllSizes,
  searchProduct,
  filterProducts,
  getAllProducts,
  cleanProducts,
} = productSlice.actions;
export default productSlice.reducer;
