import Post, { PostProps } from "../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPage = () => {
  // Check if user is logged in
  const isLoggedIn = useSelector((state: any) => state.currentUser.isLoggedIn);
  const navigate = useNavigate();
  // Get posts from server
  const [posts, setPosts] = useState<[]>([]);
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) navigate("/login");
    document.title = "Feed";
    axios
      .get(`http://${window.location.hostname}:4000/api/v1/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      });
  }, [isLoggedIn, navigate]);
  return (
    <div className={"feed"}>
      <h1 className={"page__title"}>Welcome to feed</h1>
      {posts.map((post: PostProps) => (
        <Post
          title={post["title"]}
          body={post["body"]}
          author={post["author"]}
          createdAt={
            post["createdAt"].split("T")[0] +
            " at " +
            post["createdAt"].split("T")[1].split(".")[0].split(":")[0] +
            ":" +
            post["createdAt"].split("T")[1].split(".")[0].split(":")[1]
          }
          key={post["_id"]}
          _id={post["_id"]}
        />
      ))}
    </div>
  );
};

export default MainPage;
