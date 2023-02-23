import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

import { createUser, loginUser } from "../../utility/api";
import Card from "../UI/Card";
import style from "./AuthForm.module.css";

const AuthForm = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();

  if (isLoggedIn) {
    //navigate("/");
  }

  const toggleIsLogingInHandler = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  // every user gets a userId so the plan will be to fetch that id and tie it to their username
  // on the server to store that info as well. login will then only require email and password

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const authFormData = event.target as typeof event.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    if (!isLoggingIn) {
      // create user
      const { UID, idToken, expirationTime } = await createUser({
        username: authFormData.username.value,
        email: authFormData.email.value,
        password: authFormData.password.value,
      });

      login(UID, idToken, authFormData.username.value, expirationTime);
    } else {
      // login with existing user
      const { UID, token, username, expirationTime } = await loginUser({
        email: authFormData.email.value,
        password: authFormData.password.value,
      });

      login(UID, token, username, expirationTime);
    }

    navigate("/");
  };

  return (
    <section className={style.form}>
      <Card className={style.formcontent}>
        <h1>{isLoggingIn ? "Login" : "Sign Up"}</h1>
        <form onSubmit={onSubmitHandler}>
          {!isLoggingIn && (
            <div>
              <label htmlFor="username">Your Username</label>
              <br />
              <input
                name="username"
                id="username"
                type="text"
                required
                maxLength={15}
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Your Email</label>
            <br />
            <input name="email" type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Your Password</label>
            <br />
            <input
              name="password"
              type="password"
              id="password"
              required
              minLength={8}
            />
          </div>
          <div>
            <button>{isLoggingIn ? "Login" : "Create Account"}</button>
            <button type="button" onClick={toggleIsLogingInHandler}>
              {isLoggingIn
                ? "Create new account"
                : "Login with existing account"}
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AuthForm;
