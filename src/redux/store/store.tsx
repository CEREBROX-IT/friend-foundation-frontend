import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../services/loginApi";
import { userApi } from "../services/usersApi";
import { AuthenticationApi } from "../services/AuthenticationApi";
import { FormsApi } from "../services/FormsApi";
import { ChurchApi } from "../services/ChurchApi";
export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [FormsApi.reducerPath]: FormsApi.reducer,
    [ChurchApi.reducerPath]: ChurchApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(AuthenticationApi.middleware)
      .concat(FormsApi.middleware)
      .concat(ChurchApi.middleware),
});

setupListeners(store.dispatch);

export default store;
