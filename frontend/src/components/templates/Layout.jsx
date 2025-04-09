import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main>
    <Navbar/>
    <section>
      <Outlet/>
    </section>
    <Footer/>
  </main>
  );
};

export default Layout;

