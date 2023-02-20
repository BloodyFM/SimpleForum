import React from "react";
import { redirect, useLoaderData } from "react-router-dom";

import PostDetail from "../components/Detail/PostDetail";
import { getPost, saveComment, CommentData } from "../utility/api";
import Posts from "../components/PostList/Posts";
import Comments from "../components/Detail/Comments";

const DetailPage = () => {
  const data: any = useLoaderData();
  const postData: Posts = {
    id: "not needed just lazy",
    text: data.text,
    author: data.author,
    img: data.img,
  };

  return (
    <>
      <h2>Detail Page!</h2>
      <PostDetail data={postData} />
      <Comments />
    </>
  );
};

export default DetailPage;

export function loader({ params }: any) {
  const postId: string = params.id;

  return getPost(postId);
}

export const action = async ({ request, params }: any) => {
  const data = await request.formData();
  const commentData: CommentData = {
    id: "",
    data: {
      text: data.get("comment-text"),
      author: "Admin" /*temporary name*/,
    },
    postId: params.id,
  };

  await saveComment(commentData);

  return redirect(`/${params.id}`);
};
