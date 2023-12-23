"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "@redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
      <Toaster/>
    </Provider>
  );
}
