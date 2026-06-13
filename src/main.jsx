import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,

        style: {
          background: "#0f172a",
          color: "#fff",
          borderRadius: "16px",
          padding: "14px 18px",
          fontWeight: "600",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />

    <App />
  </StrictMode>
);