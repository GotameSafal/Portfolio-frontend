import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/api";
import configUser from "./slices/configUser";
export const store = configureStore({
  reducer: {
    configUser,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
