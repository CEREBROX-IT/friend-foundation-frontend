import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../services/loginApi";
import { userApi } from "../services/usersApi";
import { AuthenticationApi } from "../services/AuthenticationApi";
import { FormsApi } from "../services/FormsApi";
import { ChurchApi } from "../services/ChurchApi";
import { UserApi } from "../services/UserApi";
export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [FormsApi.reducerPath]: FormsApi.reducer,
    [ChurchApi.reducerPath]: ChurchApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ChurchApi.middleware,
      UserApi.middleware,
      FormsApi.middleware,
      AuthenticationApi.middleware,
      userApi.middleware,
      loginApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
