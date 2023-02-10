import React from "react";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/error">Error</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
