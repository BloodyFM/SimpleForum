import React from "react";
import Card from "../UI/Card";

const Comment: React.FC<{ text: string; author: string }> = ({
  text,
  author,
}) => {
  return (
    <li>
      <Card>
        <div>
          <p>{author}</p>
        </div>
        <p>{text}</p>
      </Card>
    </li>
  );
};

export default Comment;
