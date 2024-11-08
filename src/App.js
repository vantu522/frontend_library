import React from "react";
import Header from "./modules/user/components/common/Header";
import Footer from "./modules/user/components/common/Footer";
import UserRoutes from "./modules/user/routes/UserRoutes";
// import AdminRoutes from "./modules/admin/routes/AdminRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="bodyWeb">
        <UserRoutes />
        {/* <AdminRoutes /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;