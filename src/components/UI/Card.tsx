import React, { PropsWithChildren } from "react";

import style from "./Card.module.css";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};

export default Card;
