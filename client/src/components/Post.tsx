import React from "react";

export interface PostProps {
  body: string;
  createdAt: string;
  image?: string;
  username: string;
  firstName: string;
  lastName?: string;
  _id: string;
  deletePost?: (id: string) => void;
}

const Post: React.FC<PostProps> = ({
  body,
  username,
  createdAt,
  firstName,
  lastName,
}) => {
  return (
    <div className={"post"}>
      <h3 className={"post__content"}>{body}</h3>
      <div className={"post__author"}>
        <h5 className={"post__author__name"}>
          {firstName} {lastName}
        </h5>
        <h5 className={"post__author__username"}>@{username}</h5>
      </div>
      <div className={"post__date"}>
        <h5 className={"post__date__name"}>Date: {createdAt}</h5>
      </div>
    </div>
  );
};

export default Post;
