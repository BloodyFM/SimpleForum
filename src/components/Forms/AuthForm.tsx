import React, { useState } from "react";

const AuthForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const toggleIsLogingInHandler = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  // every user gets a userId so the plan will be to fetch that id and tie it to their username
  // on the server to store that info as well. login will then only require email and password

  return (
    <section>
      <h1>{isLoggingIn ? "Login" : "Sign Up"}</h1>
      <form>
        {!isLoggingIn && (
          <div>
            <label htmlFor="auth-username">Your Username</label>
            <input
              name="auth-username"
              id="auth-username"
              type="text"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="auth-email">Your Email</label>
          <input name="auth-email" type="email" id="auth-email" required />
        </div>
        <div>
          <label htmlFor="auth-password">Your Password</label>
          <input
            name="auth-password"
            type="password"
            id="auth-password"
            required
          />
        </div>
        <div>
          <button>{isLoggingIn ? "Login" : "Create Account"}</button>
          <button type="button" onClick={toggleIsLogingInHandler}>
            {isLoggingIn ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
