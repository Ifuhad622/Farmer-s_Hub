import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"; // To enable routing
import App from "./App"; // Import the main App component
import "./App.css"; // Import global CSS styles

// Render the React app into the root div
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
