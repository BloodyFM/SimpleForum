import React from "react";

import Card from "../UI/Card";
import Posts from "../PostList/Posts";

const PostDetail: React.FC<{ data: Posts }> = ({ data }) => {
  const loadImage = data.img !== "";

  return (
    <Card>
      <section>
        <div>
          <p>{data.author}</p>
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
      </section>
    </Card>
  );
};

export default PostDetail;
