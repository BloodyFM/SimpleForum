import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import { getPosts, getUsernames } from "../utility/api";
import Posts from "../components/PostList/Posts";
import PostList from "../components/PostList/PostList";
import Card from "../components/UI/Card";

import style from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { id: UID } = useParams();
  let username = "";

  const { postData, nameData }: any = useLoaderData();

  const [posts, setPosts] = useState(postData);
  const [names, setNames] =
    useState<{ UID: string; username: string }[]>(nameData);

  for (const x in names) {
    if (UID === names[x].UID) {
      username = names[x].username;
    }
  }

  // will be usefull if I add functionality to inspect other players post's
  useEffect(() => {
    const grabData = async () => {
      setPosts(await getPosts());
      setNames(await getUsernames());
    };

    const refreshPosts = setInterval(() => {
      grabData();
    }, 3000);
    return () => clearInterval(refreshPosts);
  }, []);

  const loadedPosts: Posts[] = [];
  for (const key in posts) {
    for (const x in names) {
      if (names[x].UID === posts[key].author) {
        loadedPosts.unshift({
          id: key.toString(),
          text: posts[key].text,
          img: posts[key].img,
          author: names[x].username,
        });
      }
    }
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
  return { postData: await getPosts(), nameData: await getUsernames() };
}
