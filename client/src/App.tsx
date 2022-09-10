import React from "react";
import "./app.css";
import Navbar from "./layout/Navbar";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";

function App() {
  // fetch("http://localhost:4000/").then((res) => {
  //   console.log(res.data.message);
  // });
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
