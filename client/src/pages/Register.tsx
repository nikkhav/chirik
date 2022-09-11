import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrentUserData,
  setStatus,
} from "../store/slices/currentUserSlice";
import axios from "axios";

const Register: React.FC = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  // States for animation
  const [stage, setStage] = useState<number>(1);
  const [animate, setAnimate] = useState<boolean>(false);

  // States with user data
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Stage handler for animation
  const stageHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setStage(2);
  };

  // Register handler
  const registerAndLogin = async function () {
    try {
      const res = await axios.post(
        `http://${window.location.hostname}:4000/api/v1/auth/registration`,
        {
          username,
          password,
          firstname,
          lastname,
        }
      );
      if (res.status === 200) {
        console.log(res.data.message);
        const res2 = await axios.post(
          `http://${window.location.hostname}:4000/api/v1/auth/login`,
          {
            username,
            password,
          }
        );
        if (res2.status === 200) {
          console.log(res2.data);
          dispatch(
            setCurrentUserData({
              username: res2.data.username,
              firstname: res2.data.firstname,
              lastname: res2.data.lastname,
              token: res2.data.token,
            })
          );
          dispatch(setStatus());
          navigate("/feed");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    registerAndLogin();
  };

  // Register handlers
  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const firstnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const lastnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  // HTML forms for each stage
  const form1 = (
    <div>
      <label className={"form__login__label"} htmlFor="username">
        Введите имя пользователя
      </label>
      <input
        value={username}
        onChange={usernameHandler}
        className={"form__login__input"}
        placeholder={"Enter a username"}
      />
      <label className={"form__login__label"} htmlFor="password">
        Придумайте пароль (не менее 6 символов)
      </label>
      <input
        value={password}
        style={{ fontSize: 25 }}
        type={"password"}
        onChange={passwordHandler}
        className={"form__login__input"}
        placeholder={"Enter a password"}
      />
      <div className={"wrapper-center"}>
        <button onClick={stageHandler} className={"button__next"} type="submit">
          Далее
        </button>
      </div>
    </div>
  );

  const form2 = (
    <div>
      <label
        className={
          animate
            ? "form__login__label text__animation__opacity"
            : "form__login__label"
        }
        htmlFor="firstname"
      >
        Введите имя
      </label>
      <input
        value={firstname}
        onChange={firstnameHandler}
        className={
          animate
            ? "form__login__input input__animation__left"
            : "form__login__input"
        }
        placeholder={"Enter a name"}
      />
      <label
        className={
          animate
            ? "form__login__label text__animation__opacity"
            : "form__login__label"
        }
        htmlFor="password"
      >
        Введите фамилию (опционально)
      </label>
      <input
        value={lastname}
        onChange={lastnameHandler}
        className={
          animate
            ? "form__login__input input__animation__right"
            : "form__login__input"
        }
        placeholder={"Enter a lastname"}
      />
      <div className={"wrapper-center"}>
        <button onClick={formSubmitHandler} className={"button"} type="submit">
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
  return (
    <div className={"background__register"}>
      <form className={"form__register"}>
        <h3 className={"form__login__title"}>Регистрация в Chirik</h3>
        {stage === 1 ? form1 : form2}
        <h5 className={"form__login__mini-title"}>Уже есть аккаунт?</h5>
        <div className={"wrapper-center"}>
          <NavLink
            style={{
              textDecoration: "none",
              backgroundColor: "#34d534",
            }}
            id={"login__button__register"}
            to={"/login"}
          >
            Войти
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
