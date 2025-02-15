import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from '../components/user/layout/UserLayout';

// Import các pages
import HomePage from "../pages/user/HomePage";
import NewsPage from "../pages/user/NewsPage";
import CategoryPage from "../pages/user/CategoryPage/CategoryPage";
import SubCategoryPage from "../pages/user/CategoryPage/SubCategoryPage";
import BooksBySubCategory from "../pages/user/CategoryPage/BooksBySubCategory";
import ShopcartPage from "../pages/user/ShopcartPage";
import LoginEmail from "../pages/user/Login/LoginEmail";
import FavoriteBooks from "../pages/user/CategoryPage/FavoriteBooks";
import EditProfile from "../pages/user/Login/EditProfile";
import BookDetail from "../components/user/BookDetail";
import ForgotPassword from "../pages/user/Login/ForgotPassword";
import RequireAuth from "../components/user/RequireAuth";

const UserRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route 
          path="/category/:bigCategoryName" 
          element={<SubCategoryPage />} 
        />
        <Route
          path="/category/:bigCategoryName/:subCategoryName"
          element={<BooksBySubCategory />}
        />
        <Route path="/book/:bookId" element={<BookDetail />} /> 
        <Route path="/favorite_books" element={<FavoriteBooks />} /> 
        <Route path="/shopcart" element={ <RequireAuth>
      <ShopcartPage />
    </RequireAuth>} />
        <Route path="/login" element={<LoginEmail />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;