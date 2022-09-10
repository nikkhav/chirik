import React from "react";

interface PostProps {
  title: string;
  body: string;
  createdAt: string;
  image?: string;
  author?: string;
}

const Post: React.FC<PostProps> = ({ title, body, author }) => {
  return (
    <div className={"post"}>
      <h2 className={"post__title"}>{title}</h2>
      <h3 className={"post__content"}>{body}</h3>
      <div className={"post__author"}>
        <h5 className={"post__author__name"}>Author: {author}</h5>
      </div>
    </div>
  );
};

export default Post;
