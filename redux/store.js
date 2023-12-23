import { configureStore } from "@reduxjs/toolkit";
import navbar from "./navbar";
import { api } from "./api";
import user from "./user";
export const store = configureStore({
  reducer: {
    navbar,
    user,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
