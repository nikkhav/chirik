import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setCurrentUserData,
  setStatus,
} from "../store/slices/currentUserSlice";

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        `http://${window.location.hostname}:4000/api/v1/auth/login`,
        loginData
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setCurrentUserData({
              username: res.data.username,
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              token: res.data.token,
            })
          );
          dispatch(setStatus());
          navigate("/feed");
        }
        console.log(res);
      });
  };

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      username: e.target.value,
    });
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  };
  return (
    <form className={"form__login"}>
      <h3 className={"form__login__title"}>Вход Chirik</h3>
      <label className={"form__login__label"} htmlFor="username">
        Имя пользователя
      </label>
      <input
        className={"form__login__input"}
        onChange={usernameHandler}
        placeholder={"Enter a username"}
      />
      <label className={"form__login__label"} htmlFor="password">
        Пароль
      </label>
      <input
        type={"password"}
        style={{ fontSize: 25 }}
        className={"form__login__input"}
        onChange={passwordHandler}
        placeholder={"Enter a password"}
      />
      <div className={"wrapper-center"}>
        <button
          style={{ backgroundColor: "rgb(48,216,48)", color: "white" }}
          onClick={handleLogin}
          className={"button"}
          type="submit"
        >
          Войти
        </button>
      </div>
      <h5 className={"form__login__mini-title"}>Нет аккаунта?</h5>
      <div className={"wrapper-center"}>
        <NavLink
          style={{ textDecoration: "none" }}
          className={"link__button"}
          to={"/register"}
        >
          Зарегистрироваться
        </NavLink>
      </div>
    </form>
  );
};

export default Login;
