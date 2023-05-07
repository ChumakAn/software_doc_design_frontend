import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { DevicesPage } from "./pages/DevicesPage/DevicesPage";
import { DeviceCreationPage } from "./pages/DeviceCreationPage/DeviceCreationPage";
import { DeviceUpdatePage } from "./pages/DeviceUpdatePage/DeviceUpdatePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/devices/create" element={<DeviceCreationPage />} />
          <Route path="/devices/update" element={<DeviceUpdatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
