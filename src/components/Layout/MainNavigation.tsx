import React from "react";
import { Link } from "react-router-dom";

import style from "./MainNavigation.module.css";

const MainNavigation = () => {
  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <header className={style.header}>
      <Link to="/">
        <div className={style.logo}>Home</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/newpost">NewPost</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
