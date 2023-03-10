import React from "react";
import { useRouteError } from "react-router-dom";

import MainNavigation from "../components//Layout/MainNavigation";

const ErrorPage = () => {
  // probably not the most elegant. may need to look into it again later
  const error: any = useRouteError();

  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>An error occurred!</h1>
        <p>{error.statusText}</p>
      </main>
    </>
  );
};

export default ErrorPage;
