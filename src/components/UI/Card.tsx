import React, { PropsWithChildren } from "react";

import style from "./Card.module.css";

const Card: React.FC<PropsWithChildren<{ className: string }>> = (
  { children, className } = { className: "" }
) => {
  return <div className={`${style.card} ${className}`}>{children}</div>;
};

export default Card;
