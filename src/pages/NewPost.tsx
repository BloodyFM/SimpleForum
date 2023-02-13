import React from "react";
import { redirect } from "react-router-dom";

import NewPostForm from "../components/Forms/NewPostForm";
import { savePost } from "../utility/api";

const NewPost = () => {
  return (
    <>
      <h2>NewPost!</h2>
      <NewPostForm />
    </>
  );
};

export default NewPost;

export const action = async ({ request }: any) => {
  const data = await request.formData();
  const postData = {
    text: data.get("post-text"),
    img: data.get("post-img").trim(),
    //get author from context
    author: "Admin",
  };

  savePost(postData);
  return redirect("/");
};
