import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  // Check if user is logged in
  const isLoggedIn = useSelector((state: any) => state.currentUser.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) navigate("/login", { replace: true });
    // Change title
    document.title = "Profile";
  }, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
