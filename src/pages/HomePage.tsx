import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import PostList from "../components/PostList/PostList";
import { getPosts } from "../utility/api";
import Posts from "../components/PostList/Posts";

const HomePage = () => {
  let initLoaderData: any = useLoaderData();
  const [loaderData, setLoaderData] = useState(initLoaderData);

  useEffect(() => {
    const grabData = async () => {
      setLoaderData(await getPosts());
    };

    const refreshPosts = setInterval(() => {
      grabData();
    }, 3000);
    return () => clearInterval(refreshPosts);
  }, []);

  const loadedPosts: Posts[] = [];
  for (const key in loaderData) {
    loadedPosts.unshift({
      id: key.toString(),
      text: loaderData[key].text,
      img: loaderData[key].img,
      author: loaderData[key].author,
    });
  }

  return (
    <>
      <PostList findAutor="" data={loadedPosts} />
    </>
  );
};

export default HomePage;

export async function loader() {
  return await getPosts();
}
