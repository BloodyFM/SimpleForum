import React from "react";

import PostItem from "./PostItem";
import Posts from "./Posts";
import style from "./PostList.module.css";

const PostList: React.FC<{ findAutor: string; data: Posts[] }> = ({
  findAutor = "",
  data,
}) => {
  // filter to only show the selected user
  let filteredData: Posts[] = data;
  if (findAutor !== "") {
    //console.log("User: " + findAutor + ", filtering to only show users posts.");
    filteredData = data.filter((item) => item.author === findAutor);
  }

  // in the event the list is empty we return here
  if (filteredData.length === 0) {
    return <p>No posts found. You should create some.</p>;
  }

  return (
    <ul className={style.list}>
      {filteredData.map((post: any) => (
        <PostItem
          key={post.id}
          id={post.id}
          text={post.text}
          author={post.author}
          UID={post.UID}
          url={post.img}
        />
      ))}
    </ul>
  );
};

export default PostList;
