import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingClean from "./pages/landing_clean";
import EnhancedLoginPageV2 from "./pages/login_enhanced_v2";
import AdminDashboardV3 from "./pages/adminDashboard_v3";
import UserDashboardV2 from "./pages/userDashboard_v2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={"/"} element={<LandingClean />} />
        <Route path={"/login"} element={<EnhancedLoginPageV2 />} />
        <Route path={"/admin"} element={<AdminDashboardV3 />} />
        <Route path={"/user"} element={<UserDashboardV2 />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
