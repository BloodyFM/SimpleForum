import React, { PropsWithChildren, useState } from "react";

type AuthContextObj = {
  token: string | null;
  isLoggedIn: boolean;
  username: string;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextObj>({
  token: null,
  isLoggedIn: false,
  username: "",
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  let initToken: string | null = null;
  // Try to get token when opening wepsite. If unsuccessfull it will be null

  const [token, setToken] = useState<string | null>(initToken);
  const isLoggedIn: boolean = !!token;

  let username: string = "";
  // fetch username and assign it if logged in
  if (isLoggedIn) {
    // grabbing username here
  }

  const loginHandler = (token: string) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue: AuthContextObj = {
    token: token,
    isLoggedIn: isLoggedIn,
    username: username,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
