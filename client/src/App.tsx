import React from "react";
import "./app.css";
import Navbar from "./layout/Navbar";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/create-post"} element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
