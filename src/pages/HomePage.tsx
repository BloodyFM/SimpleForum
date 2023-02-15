import React from "react";
import { useLoaderData } from "react-router-dom";

import PostList from "../components/PostList/PostList";
import { getPosts } from "../utility/api";
import Posts from "../components/PostList/Posts";

const HomePage = () => {
  const loaderData: any = useLoaderData();
  const loadedPosts: Posts[] = [];
  for (const key in loaderData) {
    loadedPosts.push({
      id: key.toString(),
      text: loaderData[key].text,
      img: loaderData[key].img,
      author: loaderData[key].author,
    });
  }
  

  return (
    <>
      <h2>HomePage!</h2>
      <PostList findAutor="" data={loadedPosts} />
    </>
  );
};

export default HomePage;

export async function loader() {
  return getPosts();
}
