import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../services/loginApi";
import { userApi } from "../services/usersApi";
import { statsApi } from "../services/statsApi";
export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [statsApi.reducerPath] :statsApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(statsApi.middleware)
      
});

setupListeners(store.dispatch);

export default store;
