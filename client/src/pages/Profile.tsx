import React, { useEffect } from "react";

const Profile: React.FC = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
