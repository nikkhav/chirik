import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={"nav"}>
      <nav className={"nav__inner"}>
        <div className={"flex__wrapper"}>
          <NavLink className={"nav__item flex__item"} to={"/"}>
            Лента
          </NavLink>
          <NavLink className={"nav__item flex__item"} to={"/profile"}>
            Профиль
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
