import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./Layout.scss";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="layout">
    <Header />
    <main className="layout_main">{children}</main>
    <Footer />
  </div>
);

export default Layout;
