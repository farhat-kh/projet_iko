import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";
import { Outlet } from "react-router";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout-wrapper">
    <Navbar/>
    <main className="layout-content">
      <Outlet/>
    </main>
    <Footer/>
  </div>
  );
};

export default Layout;

