import React, { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

import NewPostForm from "../components/Forms/NewPostForm";
import { AuthContext } from "../store/auth-context";

import { savePost } from "../utility/api";

const NewPost = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return <NewPostForm />;
};

export default NewPost;

export const action = async ({ request }: any) => {
  const data = await request.formData();
  const postData = {
    text: data.get("post-text"),
    img: data.get("post-img").trim(),
    author: data.get("post-author"),
  };

  savePost(postData);
  return redirect("/");
};
