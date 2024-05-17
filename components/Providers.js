"use client";
import { store } from "@redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
