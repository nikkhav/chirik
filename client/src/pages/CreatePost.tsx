import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  // Check if user is logged in
  const isLoggedIn = useSelector((state: any) => state.currentUser.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) navigate("/login");
    document.title = "Create Post";
  }, []);
  return (
    <div>
      <h1>Create post</h1>
    </div>
  );
};

export default CreatePost;
