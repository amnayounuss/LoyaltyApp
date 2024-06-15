import React from "react";
// import Sidebar from "./common/sidebar_components/sidebar";
// import RightSidebar from "./common/right-sidebar";
// import Footer from "./common/footer";
// import Header from "./common/header_components/header";
// import { Outlet } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Router from "../routes/Router";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const App = () => {
  const routing = useRoutes(Router);
  return (
    <Provider store={store}>
      <div>
        {/* <div className="page-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <RightSidebar />
          <div className="page-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div> */}
        {routing}
        <Toaster position="bottom-left" />
      </div>
    </Provider>
  );
};
export default App;
