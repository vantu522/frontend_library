import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IntroducePage from "./pages/IntroducePage";
import CategoryPage from "./pages/CategoryPage";
import ManagePage from "./pages/ManagePage";
import LoginEmail from "./pages/login/LoginEmail";
import Signup from "./pages/login/Signup";
import ForgotPassword from "./pages/login/ForgotPassword";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <div className="bodyWeb">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/shopcart" element={<ManagePage />} />
          <Route path="/loginemail" element={<LoginEmail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
