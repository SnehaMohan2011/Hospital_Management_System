import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Ensure correct path
import "./index.css";    // Ensure CSS is linked correctly

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
