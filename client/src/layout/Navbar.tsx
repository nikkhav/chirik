import { NavLink } from "react-router-dom";

const Navbar = () => {
  const classes = "nav__item flex__item";
  return (
    <nav className={"nav"}>
      <div className={"nav__wrapper"}>
        <NavLink
          className={(navData) =>
            navData.isActive ? classes + " nav__item__active" : classes
          }
          to={"/feed"}
        >
          Лента
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? classes + " nav__item__active" : classes
          }
          to={"/profile"}
        >
          Профиль
        </NavLink>
        <NavLink
          to={"/create-post"}
          className={(navData) =>
            navData.isActive ? classes + " nav__item__active" : classes
          }
        >
          Создать пост
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
