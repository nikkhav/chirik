import React, { useState } from "react";
import { PostProps } from "./Post";

const ProfilePost: React.FC<PostProps> = ({
  body,
  username,
  createdAt,
  _id,
  deletePost,
  editPost,
  likes,
  dislikes,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newBody, setNewBody] = useState<string>(body);

  return (
    <div className={"profile-page__post"}>
      {isEditing ? (
        <input
          onChange={(e) => setNewBody(e.target.value)}
          value={newBody}
          className={"profile-page__post__input"}
        />
      ) : (
        <h3 className={"profile-page__post__content"}>{body}</h3>
      )}
      <div className={"profile-page__post__author"}>
        <h5 className={"profile-page__post__author__name"}>@{username}</h5>
      </div>
      <div className={"profile-page__post__date"}>
        <h5 className={"profile-page__post__date__name"}>Date: {createdAt}</h5>
      </div>
      {isEditing ? (
        <div className={"profile-page__button-container"}>
          <button
            className={"profile-page__post__button-delete"}
            onClick={() => setIsEditing(!isEditing)}
          >
            Отмена
          </button>
          <button
            className={"profile-page__post__button-edit"}
            onClick={() => {
              setIsEditing(!isEditing);
              editPost?.(_id, newBody);
            }}
            // onClick={() => editPost?.(_id)}
          >
            Отправить
          </button>
        </div>
      ) : (
        <div className={"profile-page__button-container"}>
          <button
            onClick={() => deletePost?.(_id)}
            className={"profile-page__post__button-delete"}
          >
            Удалить
          </button>
          <button
            className={"profile-page__post__button-edit"}
            onClick={() => setIsEditing(!isEditing)}
            // onClick={() => editPost?.(_id)}
          >
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePost;
