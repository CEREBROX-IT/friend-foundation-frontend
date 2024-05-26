import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { sampleApi } from "../services/sample";

export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [sampleApi.reducerPath]: sampleApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sampleApi.middleware),
  })

setupListeners(store.dispatch)


export default store