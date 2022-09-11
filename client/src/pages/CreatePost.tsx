import React, { useEffect } from "react";

const CreatePost = () => {
  useEffect(() => {
    document.title = "Create Post";
  }, []);
  return (
    <div>
      <h1>Create post</h1>
    </div>
  );
};

export default CreatePost;
