import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as postLoader } from "./pages/HomePage";

const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NewPost = lazy(() => import("./pages/NewPost"));
const DetailPage = lazy(() => import("./pages/DetailPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: postLoader,
      },
      {
        path: "/login",
        element: (
          <Suspense>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense>
            <ProfilePage />
          </Suspense>
        ),
        loader: () =>
          import("./pages/ProfilePage").then((module) => module.loader()),
      },
      {
        path: "/newpost",
        element: (
          <Suspense>
            <NewPost />
          </Suspense>
        ),
        action: (meta) =>
          import("./pages/NewPost").then((module) => module.action(meta)),
      },
      {
        path: ":id",
        element: (
          <Suspense>
            <DetailPage />
          </Suspense>
        ),
        loader: (meta) =>
          import("./pages/DetailPage").then((module) => module.loader(meta)),
        action: (meta) =>
          import("./pages/DetailPage").then((module) => module.action(meta)),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
