import React from "react";
import Header from "../common/header_components/header";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/sidebar_components/sidebar";
import RightSidebar from "../common/right-sidebar";
import Footer from "../common/footer";

const FullLayout = () => {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <RightSidebar />
          <div className="page-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default FullLayout;
