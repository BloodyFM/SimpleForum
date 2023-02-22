import React from "react";
import Card from "../UI/Card";

import style from "./Comment.module.css";

const Comment: React.FC<{ text: string; author: string }> = ({
  text,
  author,
}) => {
  return (
    <li>
      <Card className={style.item}>
        <div className={style.user}>
          <h2>{author}</h2>
        </div>
        <p>{text}</p>
      </Card>
    </li>
  );
};

export default Comment;
