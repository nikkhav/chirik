import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

  // Stage handler for animation
  const stageHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setStage(2);
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
        onChange={usernameHandler}
        className={"form__login__input"}
        placeholder={"Enter a username"}
      />
      <label className={"form__login__label"} htmlFor="password">
        Придумайте пароль (не менее 6 символов)
      </label>
      <input
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
        onChange={lastnameHandler}
        className={
          animate
            ? "form__login__input input__animation__right"
            : "form__login__input"
        }
        placeholder={"Enter a lastname"}
      />
      <div className={"wrapper-center"}>
        <button className={"button"} type="submit">
          Далее
        </button>
      </div>
    </div>
  );
  return (
    <form className={"form__register"}>
      <h3 className={"form__login__title"}>Добро Пожаловать в Chirik 🕊</h3>
      {stage === 1 ? form1 : form2}
      <h5 className={"form__login__mini-title"}>Уже есть аккаунт?</h5>
      <div className={"wrapper-center"}>
        <NavLink
          style={{
            textDecoration: "none",
            backgroundColor: "rgb(51, 222, 51)",
          }}
          id={"login__button__register"}
          to={"/login"}
        >
          Войти
        </NavLink>
      </div>
    </form>
  );
};

export default Register;
