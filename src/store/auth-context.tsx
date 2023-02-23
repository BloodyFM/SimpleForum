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
  UID: string;
  login: (
    UID: string,
    token: string,
    username: string,
    expirationTime: string
  ) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextObj>({
  token: null,
  isLoggedIn: false,
  username: "",
  UID: "",
  login: (UID, token, username, expirationTime) => {},
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
  const UID = localStorage.getItem("UID");
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
    localStorage.removeItem("UID");
    localStorage.removeItem("expirationTime");
    return { token: null, username: null, UID: null, remainingTime: null };
  }

  return { token, username, UID, remainingTime };
};

const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const tokenData = retrieveTokenData();
  let initToken: string | null = null;
  let initUsername: string = "";
  let initUID: string = "";
  if (tokenData.token) {
    initToken = tokenData.token;
    if (tokenData.username && tokenData.UID) {
      initUsername = tokenData.username;
      initUID = tokenData.UID;
    }
  }

  const [token, setToken] = useState<string | null>(initToken);
  const [username, setUsername] = useState<string>(initUsername);
  const [UID, setUID] = useState<string>(initUID);
  const isLoggedIn: boolean = !!token;

  const loginHandler = (
    token: string,
    username: string,
    UID: string,
    expirationTime: string
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("UID", UID);
    localStorage.setItem("expirationTime", expirationTime);

    setToken(token);
    setUsername(username);
    setUID(UID);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("UID");
    localStorage.removeItem("expirationTime");

    setToken(null);
    setUsername("");
    setUID("");

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
    UID: UID,
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
