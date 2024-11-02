import React from "react";
import Header from "./components/common/Header";
// import Sidebar from "./components/Sidebar";
import Footer from "./components/common/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/User/HomePage";
import IntroducePage from "./pages/User/IntroducePage";
import  CategoryPage  from "./pages/User/CategoryPage/CategoryPage";
import SubCategoryPage from "./pages/User/CategoryPage/SubCategoryPage";
import ManagePage from "./pages/User/ManagePage";
import LoginEmail from "./pages/login/LoginEmail";
import Signup from "./pages/login/Signup";
import ForgotPassword from "./pages/login/ForgotPassword";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Sidebar /> */}
      <div className="bodyWeb">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path='/categories/:bigCategoryName' element={<SubCategoryPage/>}></Route>
          <Route path="/shopcart" element={<ManagePage />} />
          <Route path="/login-email" element={<LoginEmail />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
