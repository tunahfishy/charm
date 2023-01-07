import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Email from "./pages/email"
// import AddPhoto from "./addPhoto";
// import GenerateText from "./generateText";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/email" element={<Email/>}/>
        {/* <Route path="photos" element={<AddPhoto />} />
        <Route path="email" element={<GenerateText />} /> */}
        <Route path="*" element={<h1>Route does not exist</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
