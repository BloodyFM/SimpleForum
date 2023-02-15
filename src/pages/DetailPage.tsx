import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

import PostDetail from "../components/Detail/PostDetail";
import { getPost } from "../utility/api";
import Posts from "../components/PostList/Posts";

const DetailPage = () => {
  const data: any = useLoaderData();
  const params: any = useParams();
  const postData: Posts = {
    id: params.id,
    text: data.text,
    author: data.author,
    img: data.img,
  };

  return (
    <>
      <h2>Detail Page!</h2>
      <PostDetail data={postData} />
      <section>
        <p>comments</p>
      </section>
    </>
  );
};

export default DetailPage;

export function loader({ params }: any) {
  const postId: string = params.id;

  return getPost(postId);
}
