import React from "react";
import { PostProps } from "./Post";
import axios from "axios";

const ProfilePost: React.FC<PostProps> = ({
  body,
  author,
  createdAt,
  _id,
  title,
}) => {
  // TODO: Re render component when post is deleted
  const deletePost = () => {
    // Delete post from server
    axios
      .delete(`http://${window.location.hostname}:4000/api/v1/posts/${_id}`)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className={"profile-page__post"}>
      <p>TEST id = {_id}</p>
      <h2 className={"profile-page__post__title"}>{title}</h2>
      <h3 className={"profile-page__post__content"}>{body}</h3>
      <div className={"profile-page__post__author"}>
        <h5 className={"profile-page__post__author__name"}>@{author}</h5>
      </div>
      <div className={"profile-page__post__date"}>
        <h5 className={"profile-page__post__date__name"}>Date: {createdAt}</h5>
      </div>
      <div className={"profile-page__button-container"}>
        <button
          onClick={deletePost}
          className={"profile-page__post__button-delete"}
        >
          Delete
        </button>
        <button className={"profile-page__post__button-edit"}>Edit</button>
      </div>
    </div>
  );
};

export default ProfilePost;
