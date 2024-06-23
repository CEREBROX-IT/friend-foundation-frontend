import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthenticationApi } from "../services/AuthenticationApi";
import { ChurchApi } from "../services/ChurchApi";
import { UserApi } from "../services/UserApi";
import { StatsApi } from "../services/StatsApi";
import { DistrictApi } from "../services/DistrictApi";
import { AssignedLogsApi } from "../services/AssignedLogsApi";
import { FormApi } from "../services/FormApi";
export const store = configureStore({
  reducer: {
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [ChurchApi.reducerPath]: ChurchApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [StatsApi.reducerPath]: StatsApi.reducer,
    [DistrictApi.reducerPath]: DistrictApi.reducer,
    [AssignedLogsApi.reducerPath]: AssignedLogsApi.reducer,
    [FormApi.reducerPath]: FormApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ChurchApi.middleware,
      UserApi.middleware,
      AuthenticationApi.middleware,
      StatsApi.middleware,
      DistrictApi.middleware,
      AssignedLogsApi.middleware,
      FormApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
