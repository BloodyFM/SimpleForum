import React from "react";

import Card from "../UI/Card";

const PostItem: React.FC<{
  text: string;
  author: string;
  url: string;
  id: string;
}> = ({ text, author, url, id }) => {
  const loadImage = url !== "";

  const openDetailHandler = () => {
    console.log("Opens detail page in the future.");
  };

  return (
    <li>
      <Card>
        <section onClick={openDetailHandler}>
          <div>
            <h2>{author}</h2>
          </div>
          {loadImage && (
            <img
              height="30%"
              width="30%"
              src={url}
              alt={"Could not load. Url must be incorrect or it is expired."}
            />
          )}
          <p>{text}</p>
        </section>
      </Card>
    </li>
  );
};

export default PostItem;
