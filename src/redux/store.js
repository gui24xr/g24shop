import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import onAuthReducer from "./onAuthSlice"


export const store = configureStore({
    reducer:{
        user: userReducer,
        onAuth: onAuthReducer
       // admin: adminSlice,
        //products: productsSlice,
    }
})