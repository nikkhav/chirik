import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../components/Post";
import axios from "axios";
import ProfilePost from "../components/ProfilePost";

const Profile: React.FC = () => {
  // Set up state
  const [posts, setPosts] = useState<[]>([]);
  const { firstname, username, lastname } = useSelector(
    (state: any) => state.currentUser
  );
  // Check if user is logged in
  const isLoggedIn = useSelector((state: any) => state.currentUser.isLoggedIn);
  const navigate = useNavigate();

  // Delete post from server
  const deletePost = (id: string) => {
    axios
      .delete(`http://${window.location.hostname}:4000/api/v1/posts/${id}`)
      .then((res) => {
        console.log(res.data);
      });
    axios
      .get(`http://${window.location.hostname}:4000/api/v1/posts/${username}`)
      .then((res) => {
        setPosts(res.data.posts);
      });
  };

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) navigate("/login", { replace: true });
    // Change title
    document.title = "Profile";

    // Get posts from server
    const postsInterval = setInterval(() => {
      axios
        .get(`http://${window.location.hostname}:4000/api/v1/posts/${username}`)
        .then((res) => {
          setPosts(res.data.posts);
        });
    }, 2000);
    return () => {
      // Cleanup
      clearInterval(postsInterval);
    };
  }, [isLoggedIn, navigate, username]);
  return (
    // TODO Put username under name
    <div className={"profile-page"}>
      <div className={"profile-page__container"}>
        <h1 className={"profile-page__container__name"}>
          {firstname} {lastname} @{username}
        </h1>

        <div className={"profile-page__posts"}>
          {posts.map((post: PostProps) => (
            <ProfilePost
              body={post["body"]}
              username={post["username"]}
              firstName={post["firstName"]}
              lastName={post["lastName"]}
              createdAt={
                post["createdAt"].split("T")[0] +
                " at " +
                post["createdAt"].split("T")[1].split(".")[0].split(":")[0] +
                ":" +
                post["createdAt"].split("T")[1].split(".")[0].split(":")[1]
              }
              key={post["_id"]}
              _id={post["_id"]}
              deletePost={deletePost}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
