import Post, { PostProps } from "../components/Post";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";

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

    // Set up interval to get posts from server
    const postsInterval = setInterval(() => {
      axios
        .get(`http://${window.location.hostname}:4000/api/v1/posts`)
        .then((res) => {
          setPosts(res.data.posts);
        });
    }, 1500);
    return () => {
      // Cleanup
      clearInterval(postsInterval);
    };
  }, [isLoggedIn, navigate]);
  return (
    <Fragment>
      <div className={"wrapper-center"}>
        <CreatePost />
      </div>
      <div className={"feed"}>
        {posts.map((post: PostProps) => (
          <Post
            body={post["body"]}
            username={post["username"]}
            firstName={post["firstName"]}
            lastName={post["lastName"]}
            likes={post["likes"]}
            dislikes={post["dislikes"]}
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
    </Fragment>
  );
};

export default MainPage;
