console.log("MAIN RUNNING");
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router";


import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter >
   <App/>
    </BrowserRouter>
  </StrictMode>
);

//DO NOT TOUCH SETTINGS ON THIS PAGE







