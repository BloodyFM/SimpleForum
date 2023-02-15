import React from "react";

import Card from "../UI/Card";
import Posts from "../PostList/Posts";

const PostDetail: React.FC<{ data: Posts }> = ({ data }) => {
  const loadImage = data.img !== "";

  return (
    <Card>
      <section>
        <div>
          <h2>{data.author}</h2>
        </div>
        <div>
          {loadImage && (
            <img
              src={data.img}
              alt="Could not load. Url must be incorrect or it is expired."
            />
          )}
          <p>{data.text}</p>
        </div>
      </section>
    </Card>
  );
};

export default PostDetail;
