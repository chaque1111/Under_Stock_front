import {createSlice} from "@reduxjs/toolkit";
const initialState = {
  products: [],
  productsCopy: [],
  productDetail: {},
  colors: [],
  sizes: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
      state.productsCopy = action.payload;
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
  },
});

export const {
  getProductDetail,
  deleteFilters,
  getAllColors,
  getAllSizes,
  searchProduct,
  filterProducts,
  getAllProducts,
} = productSlice.actions;
export default productSlice.reducer;
