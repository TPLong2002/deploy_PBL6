import { configureStore } from "@reduxjs/toolkit";
import changeIFReducer from "./components/pages/StoreIF/IFSlice";

export const store = configureStore({
  reducer: { changeIF: changeIFReducer },
});
