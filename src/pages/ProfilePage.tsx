import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { getPosts } from "../utility/api";
import Posts from "../components/PostList/Posts";
import PostList from "../components/PostList/PostList";
import { AuthContext } from "../store/auth-context";
import Card from "../components/UI/Card";

import style from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { isLoggedIn, username } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const initLoaderData: any = useLoaderData();

  const [loaderData, setLoaderData] = useState(initLoaderData);

  // will be usefull if I add functionality to inspect other players post's
  /*useEffect(() => {
    const grabData = async () => {
      setLoaderData(await getPosts());
    };

    const refreshPosts = setInterval(() => {
      grabData();
    }, 3000);
    return () => clearInterval(refreshPosts);
  }, []);*/

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
      <section className={style.profile}>
        <Card className={style.info}>
          <h1>{username + "'s Posts!"}</h1>
        </Card>
      </section>
      <PostList findAutor={username} data={loadedPosts} />
    </>
  );
};

export default ProfilePage;

export async function loader() {
  return getPosts();
}
