import React from "react";
import "./app.css";
import Navbar from "./layout/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state: any) => state.currentUser.isLoggedIn);
  return (
    <div>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path={"/feed"} element={<MainPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/"} element={<Navigate to={"/login"} replace={true} />} />
        <Route path={"*"} element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
