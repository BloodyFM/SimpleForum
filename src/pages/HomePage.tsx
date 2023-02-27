import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import PostList from "../components/PostList/PostList";
import { getPosts, getUsernames } from "../utility/api";
import Posts from "../components/PostList/Posts";

const HomePage = () => {
  let { postData, nameData }: any = useLoaderData();
  const [posts, setPosts] = useState(postData);
  const [names, setNames] = useState(nameData);

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
          UID: posts[key].author,
        });
      }
    }
  }

  return <PostList findAutor="" data={loadedPosts} />;
};

export default HomePage;

export async function loader() {
  return { postData: await getPosts(), nameData: await getUsernames() };
}
