import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { AdminAuthProvider } from "./context/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);