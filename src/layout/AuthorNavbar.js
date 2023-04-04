import React from "react";
import { Outlet } from "react-router";
import AuthorNav from './../Components/Shared/AuthorNav';

const AuthorNavbar = () => {
  return (
    <div>
      <AuthorNav />
      <Outlet></Outlet>
    </div>
  );
};

export default AuthorNavbar;
