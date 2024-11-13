import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import IntroducePage from "../pages/IntroducePage/IntroducePage";
import CategoryPage from "../pages/CategoryPage/CategoryPage/CategoryPage";
import SubCategoryPage from "../pages/CategoryPage/SubCategoryPage/SubCategoryPage";
import BooksBySubCategory from "../pages/CategoryPage/BooksBySubCategory/BooksBySubCategory";
import ManagePage from "../pages/ManagePage/ManagePage";
import LoginEmail from "../pages/Login/LoginEmail";
import Signup from "../pages/Login/Signup";
import ForgotPassword from "../pages/Login/ForgotPassword";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/introduce" element={<IntroducePage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/category/:bigCategoryName" element={<SubCategoryPage />} />
      <Route
        path="/category/:bigCategoryName/:subCategoryName"
        element={<BooksBySubCategory />}
      />
      <Route path="/shopcart" element={<ManagePage />} />
      <Route path="/loginemail" element={<LoginEmail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
};

export default UserRoutes;