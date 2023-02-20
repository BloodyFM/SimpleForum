import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

let logoutTimer: NodeJS.Timer;

type AuthContextObj = {
  token: string | null;
  isLoggedIn: boolean;
  username: string;
  login: (token: string, username: string, expirationTime: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextObj>({
  token: null,
  isLoggedIn: false,
  username: "",
  login: (token, username, expirationTime) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const numExpirationTime = new Date(expirationTime).getTime();

  return numExpirationTime - currentTime;
};

const retrieveTokenData = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const expirationTime = localStorage.getItem("expirationTime");

  let remainingTime = 0;
  if (expirationTime) {
    remainingTime = calculateRemainingTime(expirationTime);
  }

  // if time runs out clear local storage and return null
  // we wipe it 60 seconds before the token expires for safety
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationTime");
    return { token: null, username: null, remainingTime: null };
  }

  return { token, username: username, remainingTime };
};

const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const tokenData = retrieveTokenData();
  let initToken: string | null = null;
  let initUsername: string = "";
  if (tokenData.token) {
    initToken = tokenData.token;
    if (tokenData.username) {
      initUsername = tokenData.username;
    }
  }

  const [token, setToken] = useState<string | null>(initToken);
  const [username, setUsername] = useState<string>(initUsername);
  const isLoggedIn: boolean = !!token;

  const loginHandler = (
    token: string,
    username: string,
    expirationTime: string
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("expirationTime", expirationTime);

    setToken(token);
    setUsername(username);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationTime");

    setToken(null);
    setUsername("");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData.remainingTime) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

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
