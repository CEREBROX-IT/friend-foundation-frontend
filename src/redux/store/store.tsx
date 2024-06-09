import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../services/loginApi";
import { userApi } from "../services/usersApi";
export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware).concat(userApi.middleware)
});

setupListeners(store.dispatch);

export default store;
