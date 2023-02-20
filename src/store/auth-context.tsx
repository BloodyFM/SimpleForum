import React, { PropsWithChildren, useState } from "react";

type AuthContextObj = {
  token: string | null;
  isLoggedIn: boolean;
  username: string;
  login: (token: string, username: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextObj>({
  token: null,
  isLoggedIn: false,
  username: "",
  login: (token, username) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  let initToken: string | null = null;
  // Try to get token when opening wepsite. If unsuccessfull it will be null
  //initToken = "123";
  let initUsername: string = "";
  // try to get username

  const [token, setToken] = useState<string | null>(initToken);
  const [username, setUsername] = useState<string>(initUsername);
  const isLoggedIn: boolean = !!token;

  if (isLoggedIn) {
    // grabbing username here
  }

  const loginHandler = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
  };
  const logoutHandler = () => {
    setToken(null);
    setUsername("");
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
