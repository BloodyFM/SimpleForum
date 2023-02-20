import React, { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { getPosts } from "../utility/api";
import Posts from "../components/PostList/Posts";
import PostList from "../components/PostList/PostList";
import { AuthContext } from "../store/auth-context";

const ProfilePage = () => {
  const { isLoggedIn, username } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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
      <h1>{username}</h1>
      <h2>ProfilePage!</h2>
      <PostList findAutor={username} data={loadedPosts} />
    </>
  );
};

export default ProfilePage;

export async function loader() {
  return getPosts();
}
