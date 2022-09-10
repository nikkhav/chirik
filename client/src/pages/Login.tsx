import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        `http://${window.location.hostname}:4000/api/v1/auth/login`,
        loginData
      )
      .then((res) => {
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
    <form className={"form"}>
      <h3>Вход Chirik</h3>
      <label htmlFor="username">Имя пользователя</label>
      <input onChange={usernameHandler} placeholder={"Enter a username"} />
      <label htmlFor="password">Пароль</label>
      <input onChange={passwordHandler} placeholder={"Enter a password"} />
      <div className={"wrapper-center"}>
        <button onClick={handleLogin} className={"button"} type="submit">
          Войти
        </button>
      </div>
      <h5>Нет аккаунта?</h5>
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
