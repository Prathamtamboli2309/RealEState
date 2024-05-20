import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./Context/AppContext"; // Import AppContextProvider

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        {" "}
        {/* Wrap with AppContextProvider */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
