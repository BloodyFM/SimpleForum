import React from "react";
import { redirect, useLoaderData, useParams } from "react-router-dom";

import PostDetail from "../components/Detail/PostDetail";
import { getPost, saveComment, CommentData } from "../utility/api";
import Posts from "../components/PostList/Posts";
import Comments from "../components/Detail/Comments";
import NewCommentForm from "../components/Forms/NewCommentForm";

const DetailPage = () => {
  const data: any = useLoaderData();
  const params: any = useParams();
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
      <NewCommentForm id={params.id} />
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
    data: { text: data.get("comment-text"), author: "Admin" },
    quoteId: params.id,
  };

  saveComment(commentData);
  return redirect(`/${params.id}`);
};
