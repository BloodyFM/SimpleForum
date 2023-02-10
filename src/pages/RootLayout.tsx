import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";

const Layout: React.FC<PropsWithChildren<{}>> = (props) => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
