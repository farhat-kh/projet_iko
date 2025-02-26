import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

