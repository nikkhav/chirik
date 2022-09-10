import React from "react";
import "./app.css";
import Navbar from "./layout/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// TODO: Отображать страницу с постами, если пользователь авторизован
// TODO: Отображать страницу с логином, если пользователь не авторизован
// TODO: Не отображать навигацию, если пользователь не авторизован

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/feed"} element={<MainPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/create-post"} element={<CreatePost />} />
        <Route path={"/"} element={<Navigate to={"/login"} />} />
        <Route path={"*"} element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
