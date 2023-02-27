import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../UI/Card";
import style from "./PostItem.module.css";

const PostItem: React.FC<{
  text: string;
  author: string;
  UID: string;
  url: string;
  id: string;
}> = ({ text, author, UID, url, id }) => {
  const navigate = useNavigate();

  const loadImage = url !== "";

  const openDetailHandler = () => {
    navigate(`/${id}`);
  };

  const openProfileHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    navigate(`/profile/${UID}`);
  };

  return (
    <li>
      <Card className={style.item}>
        <section onClick={openDetailHandler}>
          <div className={style.user} onClick={openProfileHandler}>
            <h2>{author}</h2>
          </div>
          <p>{text}</p>
          {loadImage && (
            <img
              src={url}
              alt="Could not load. Url must be incorrect or it is expired."
            />
          )}
        </section>
      </Card>
    </li>
  );
};

export default PostItem;
