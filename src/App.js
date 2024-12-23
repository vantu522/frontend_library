import React from "react";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from "./routes/AdminRoutes";
import AuthForm from './pages/admin/login/LoginEmail';  // Import trang login admin

function App() {
  return (
    <>
      <Routes> 
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/admin/login" element={<AuthForm />} />  {/* Thêm đường dẫn login của admin */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      <ToastContainer    
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
