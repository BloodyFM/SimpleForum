import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/RootLayout";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as postLoader } from "./pages/HomePage";
import ProfilePage, { loader as personalPostLoader } from "./pages/ProfilePage";
import NewPost, { action as newPostAction } from "./pages/NewPost";
import DetailPage, {
  loader as detailPostLoader,
  action as newCommentAction,
} from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: postLoader },
      { path: "/login", element: <AuthPage />, action: authAction },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: personalPostLoader,
      },
      { path: "/newpost", element: <NewPost />, action: newPostAction },
      {
        path: ":id",
        element: <DetailPage />,
        loader: detailPostLoader,
        action: newCommentAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
