import { NavLink } from "react-router-dom";
import { setStatus } from "../store/slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = "nav__item";
  const currentUser = useSelector((state: any) => state.currentUser);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setStatus());
  };
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

        <NavLink onClick={logout} to={"/login"} className={classes}>
          Выйти
        </NavLink>
      </div>
      <div className={"welcome__user"}>
        <span>Привет, {currentUser.firstname}!</span>
      </div>
    </nav>
  );
};

export default Navbar;
