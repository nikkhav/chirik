import React from "react";
import { PostProps } from "./Post";

const ProfilePost: React.FC<PostProps> = ({
  body,
  username,
  createdAt,
  _id,
  deletePost,
}) => {
  return (
    <div className={"profile-page__post"}>
      <h3 className={"profile-page__post__content"}>{body}</h3>
      <div className={"profile-page__post__author"}>
        <h5 className={"profile-page__post__author__name"}>@{username}</h5>
      </div>
      <div className={"profile-page__post__date"}>
        <h5 className={"profile-page__post__date__name"}>Date: {createdAt}</h5>
      </div>
      <div className={"profile-page__button-container"}>
        <button
          onClick={() => deletePost?.(_id)}
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
