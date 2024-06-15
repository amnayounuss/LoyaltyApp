import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import App from "./components/app";

const Root = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <PerfectScrollbar>
          <App />
        </PerfectScrollbar>
      </BrowserRouter>
    </Suspense>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <Root />
  </>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
