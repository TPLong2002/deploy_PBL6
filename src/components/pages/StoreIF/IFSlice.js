import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  HL: "123",
  DC: "Đà Nẵng",
  Email: "Shopmi@gmail.com",
};
export const IFSlice = createSlice({
  name: "IF",
  initialState,
  reducers: {
    changeHL: (state, action) => {
      state.HL = action.payload;
    },
    changeDC: (state, action) => {
      state.DC = action.payload;
    },
    changeEmail: (state, action) => {
      state.Email = action.payload;
    },
  },
});
export const { changeHL, changeDC, changeEmail } = IFSlice.actions;
export default IFSlice.reducer;
