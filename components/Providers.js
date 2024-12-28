"use client";
import { store } from "@redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover={false}
          toastClassName="font-semibold"
          theme="colored"
        />
    </Provider>
  );
};

export default Providers;
