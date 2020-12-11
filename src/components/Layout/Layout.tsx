import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./Layout.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
