import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Catalog: [],
};
export const ProductSlice = createSlice({
  name: "IF",
  initialState,
  reducers: {
    changeHL: (state, action) => {
      state.HL = action.payload;
    },
  },
});
export const { changeHL } = ProductSlice.actions;
export default ProductSlice.reducer;
