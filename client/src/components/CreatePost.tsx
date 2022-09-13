import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreatePost: React.FC = () => {
  const [postBody, setPostBody] = useState<string>("");
  const username = useSelector((state: any) => state.currentUser.username);
  const firstName = useSelector((state: any) => state.currentUser.firstname);
  const lastName = useSelector((state: any) => state.currentUser.lastname);

  const sendPost = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //Send post to server
    axios
      .post(`http://${window.location.hostname}:4000/api/v1/posts`, {
        body: postBody,
        username,
        firstName,
        lastName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setPostBody("");
  };
  return (
    <div className={"post-form"}>
      <input
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
        className={"post-form__body-input"}
        placeholder={"Что у вас нового?"}
      />
      <div className={"post-form__button-container"}>
        <button onClick={sendPost} className={"post-form__button"}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
