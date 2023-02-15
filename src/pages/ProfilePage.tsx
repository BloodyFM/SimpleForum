import React from "react";
import { useLoaderData } from "react-router-dom";

import { getPosts } from "../utility/api";
import Posts from "../components/PostList/Posts";
import PostList from "../components/PostList/PostList";

const ProfilePage = () => {
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
      <h2>ProfilePage!</h2>
      <PostList findAutor="Admin" data={loadedPosts} />
    </>
  );
};

export default ProfilePage;

export async function loader() {
  return getPosts();
}
