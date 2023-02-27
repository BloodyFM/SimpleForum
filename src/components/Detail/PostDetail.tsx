import React from "react";

import Card from "../UI/Card";
import Posts from "../PostList/Posts";
import style from "./PostDetail.module.css";
import { useNavigate } from "react-router-dom";

const PostDetail: React.FC<{ data: Posts }> = ({ data }) => {
  const navigate = useNavigate();
  const loadImage = data.img !== "";

  const openProfileHandler = () => {
    navigate(`/profile/${data.UID}`);
  };

  return (
    <section className={style.post}>
      <Card className={style.item}>
        <div className={style.user} onClick={openProfileHandler}>
          <h2>{data.author}</h2>
        </div>
        <div>
          <p>{data.text}</p>
          {loadImage && (
            <img
              src={data.img}
              alt="Could not load. Url must be incorrect or it is expired."
            />
          )}
        </div>
      </Card>
    </section>
  );
};

export default PostDetail;
