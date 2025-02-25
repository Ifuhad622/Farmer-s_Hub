import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the main App component
import "./App.css"; // Import global CSS styles
import { BrowserRouter as Router } from "react-router-dom"; // To enable routing

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
