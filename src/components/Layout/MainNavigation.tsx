import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

import style from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { isLoggedIn, logout, UID } = useContext(AuthContext);

  const navigate = useNavigate();
  const logoutHandler = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      logout();
    }
  };

  return (
    <header className={style.header}>
      <Link to="/">
        <div className={style.logo}>Home</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <Link to="/newpost">NewPost</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to={`/profile/${UID}`}>Profile</Link>
            </li>
          )}
          <li>
            <button onClick={logoutHandler}>
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
