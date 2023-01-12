import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App, AuthRedirect} from "./App";
import AddPhoto from "./addPhoto";
import GenerateText from "./generateText";
import Email from "./pages/email";
import Profiles from "./pages/profiles";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./components/layout";
import Features from "./Features";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <NextUIProvider>
    <Layout> </Layout>

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth_redirect" element={<AuthRedirect />} />
          <Route path="photos" element={<AddPhoto />} />
          <Route path="generateText" element={<GenerateText />} />
          <Route path="/email" element={<Email />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/features" element={<Features />} />
          <Route path="*" element={<h1>Route does not exist</h1>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </NextUIProvider>
);
