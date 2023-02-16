import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../UI/Card";

const PostItem: React.FC<{
  text: string;
  author: string;
  url: string;
  id: string;
}> = ({ text, author, url, id }) => {
  const navigate = useNavigate();

  const loadImage = url !== "";

  const openDetailHandler = () => {
    navigate(`/${id}`);
  };

  return (
    <li>
      <Card>
        <section onClick={openDetailHandler}>
          <div>
            <h2>{author}</h2>
          </div>
          <p>{text}</p>
          {loadImage && (
            <img
              height="30%"
              width="30%"
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
