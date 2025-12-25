import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Reducer from "./Utility/Reducer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Reducer>
        <App />
      </Reducer>
    </BrowserRouter>
  </StrictMode>
);
