import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/RootLayout";

import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <AuthPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
