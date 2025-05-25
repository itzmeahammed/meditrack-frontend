import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import UserDashboard from "./pages/userDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/admin"} element={<AdminDashboard />} />
        <Route path={"/user"} element={<UserDashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
