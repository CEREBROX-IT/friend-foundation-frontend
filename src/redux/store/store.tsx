import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/usersApi";
import { AuthenticationApi } from "../services/AuthenticationApi";
import { ChurchApi } from "../services/ChurchApi";
import { UserApi } from "../services/UserApi";
import { StatsApi } from "../services/StatsApi";
import { DistrictApi } from "../services/DistrictApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [ChurchApi.reducerPath]: ChurchApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [StatsApi.reducerPath]: StatsApi.reducer,
    [DistrictApi.reducerPath]: DistrictApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ChurchApi.middleware,
      UserApi.middleware,
      AuthenticationApi.middleware,
      userApi.middleware,
      StatsApi.middleware,
      DistrictApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
