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

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) navigate("/login", { replace: true });
    // Change title
    document.title = "Profile";

    // Get posts from server
    axios
      .get(`http://${window.location.hostname}:4000/api/v1/posts/${username}`)
      .then((res) => {
        setPosts(res.data.posts);
      });
  }, [isLoggedIn, navigate, username]);
  return (
    // TODO Finish profile page
    <div className={"profile-page"}>
      <div className={"profile-page__container"}>
        <h1 className={"profile-page__container__username"}>
          {firstname} {lastname} @{username}
        </h1>
        <h2 className={"profile-page__container__functions"}>
          ?Управление постами?
        </h2>
        <h2 className={"profile-page__container__functions"}>?Друзья?</h2>
        <h2 className={"profile-page__container__functions"}>
          ?Удалить аккаунт?
        </h2>

        <div className={"profile-page__posts"}>
          {posts.map((post: PostProps) => (
            <ProfilePost
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
      </div>
    </div>
  );
};

export default Profile;
