import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./scenes/Home";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Contact } from "./scenes/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
]);


const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("no root html tag not found");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))np
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
