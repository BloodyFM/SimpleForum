import React from "react";
import { redirect } from "react-router-dom";

import AuthForm from "../components/Forms/AuthForm";

const AuthPage = () => {
  return (
    <>
      <h2>AuthPage!</h2>
      <AuthForm />
    </>
  );
};

export default AuthPage;

type AuthData = {
  username: string;
  email: string;
  password: string;
};

export const action = async ({ request }: any) => {
  const data = await request.formData();
  const authData: AuthData = {
    username: data.get("auth-username"),
    email: data.get("auth-email"),
    password: data.get("auth-password"),
  };

  console.log(authData);

  return redirect("/");
};
