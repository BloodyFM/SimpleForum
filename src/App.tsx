import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/RootLayout";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as postLoader } from "./pages/HomePage";
import ProfilePage, { loader as personalPostLoader } from "./pages/ProfilePage";
import NewPost, { action as newPostAction } from "./pages/NewPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: postLoader },
      { path: "/login", element: <AuthPage /> },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: personalPostLoader,
      },
      { path: "/newpost", element: <NewPost />, action: newPostAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
