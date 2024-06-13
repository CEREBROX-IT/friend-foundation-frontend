import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../services/loginApi";
import { userApi } from "../services/usersApi";
import { AuthenticationApi } from "../services/AuthenticationApi";
export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(AuthenticationApi.middleware)
      
});

setupListeners(store.dispatch);

export default store;
