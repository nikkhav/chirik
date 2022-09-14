import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";

export interface PostProps {
  body: string;
  createdAt: string;
  image?: string;
  username: string;
  firstName: string;
  lastName?: string;
  _id: string;
  likes: [];
  dislikes: [];
  deletePost?: (id: string) => void;
  editPost?: (id: string, newBody: string) => void;
}

const Post: React.FC<PostProps> = ({
  body,
  username,
  createdAt,
  firstName,
  lastName,
  likes,
  dislikes,
  _id,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const userName: string = useSelector(
    (state: any) => state.currentUser.username
  );

  // Put like
  const putLike = async (id: string) => {
    axios
      .put(`http://${window.location.hostname}:4000/api/v1/posts/like/${id}`, {
        username: userName,
      })
      .then(() => {
        setLiked(!liked);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(likes);
  };

  // Put dislike
  const putDislike = async (id: string) => {
    axios
      .put(
        `http://${window.location.hostname}:4000/api/v1/posts/dislike/${id}`,
        {
          username: userName,
        }
      )
      .then(() => {
        setDisliked(!disliked);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={"post"}>
      <h3 className={"post__content"}>{body}</h3>
      <div className={"post__info"}>
        <div className={"post__author"}>
          <h5 className={"post__author__name"}>
            {firstName} {lastName}
          </h5>
          <h5 className={"post__author__username"}>@{username}</h5>
        </div>
        <div className={"post__date"}>
          <h5 className={"post__date__name"}>Date: {createdAt}</h5>
        </div>
        <div className={"post__likes-container"}>
          <button
            disabled={disliked}
            className={"post__likes-container__button__like"}
            onClick={() => putLike(_id)}
          >
            <AiOutlineLike className={"post__likes-container__like"} />
            {likes.length}
          </button>

          {/*<h5 className={"post__likes-container__like-amount"}>*/}
          {/*  {likes.length}*/}
          {/*</h5>*/}
          <button
            disabled={liked}
            className={"post__likes-container__button__like"}
            onClick={() => putDislike(_id)}
          >
            <AiOutlineDislike
              className={"post__likes-container__like"}
              onClick={() => putDislike(_id)}
            />
            {dislikes.length}
          </button>
          {/*<h5 className={"post__likes-container__like-amount"}>*/}
          {/*  {dislikes.length}*/}
          {/*</h5>*/}
        </div>
      </div>
    </div>
  );
};

export default Post;
