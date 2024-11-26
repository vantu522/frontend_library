import React from "react";
import { Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Routes> 
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}

export default App;