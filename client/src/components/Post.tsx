import React from "react";

export interface PostProps {
  title: string;
  body: string;
  createdAt: string;
  image?: string;
  author?: string;
  _id?: string;
}

const Post: React.FC<PostProps> = ({ title, body, author, createdAt }) => {
  return (
    <div className={"post"}>
      <h2 className={"post__title"}>{title}</h2>
      <h3 className={"post__content"}>{body}</h3>
      <div className={"post__author"}>
        <h5 className={"post__author__name"}>@{author}</h5>
      </div>
      <div className={"post__date"}>
        <h5 className={"post__date__name"}>Date: {createdAt}</h5>
      </div>
    </div>
  );
};

export default Post;
