import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "../components/auth/AuthGaurd";
import Add_Merchant from "../components/merchant/add-merchant";
import Merchant_list from "../components/merchant/merchant-list";
import EditMerchant from "../components/merchant/edit-merchant";
import Add_Systemtier from "../components/settings/add-systemtier";
import Systemtier from "../components/settings/systemtier-list";
import Add_MerchantTier from "../components/merchant/addMerchantBasetier";

const FullLayout = lazy(() => import("../components/layout/FullLayout"));
const BlankLayout = lazy(() => import("../components/layout/BlankLayout"));

const Dashboard = lazy(() => import("../components/dashboard"));
const Addproduct = lazy(() =>
  import("../components/products/physical/add-product")
);
const Category = lazy(() => import("../components/products/physical/category"));
const EditProduct = lazy(() =>
  import("../components/products/physical/edit-product")
);
const Productlist = lazy(() =>
  import("../components/products/physical/product-list")
);
const Orders = lazy(() => import("../components/sales/orders"));
const Listuser = lazy(() => import("../components/users/list-user"));

const AddBanner = lazy(() => import("../components/banner/add-banner"));
const ListBanner = lazy(() => import("../components/banner/banner-list"));
const EditBanner = lazy(() => import("../components/banner/edit-banner"));

const Error = lazy(() => import("../components/auth/Error"));
const Login = lazy(() => import("../components/auth/login"));

const Router = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/products/category", exact: true, element: <Category /> },
      { path: "/products/product-list", exact: true, element: <Productlist /> },
      {
        path: "/product/edit-product/:productId",
        exact: true,
        element: <EditProduct />,
      },

      { path: "/banners/add-banner", exact: true, element: <AddBanner /> },
      { path: "/banners/list-banner", exact: true, element: <ListBanner /> },
      {
        path: "/banners/edit-banner/:bannerId",
        exact: true,
        element: <EditBanner />,
      },

      { path: "/products/add-product", exact: true, element: <Addproduct /> },
      { path: "/orders", exact: true, element: <Orders /> },
      { path: "/users/list-user", exact: true, element: <Listuser /> },

      // Merchants
      { path: "/merchant/add-merchant", exact: true, element: <Add_Merchant /> },
      { path: "/merchant/merchant-list", exact: true, element: <Merchant_list /> },
      // merchantTier
      { path: "/merchant/addMerchantBasetier", exact: true, element: <Add_MerchantTier /> },
      
      {
        path: "/merchant/edit-merchant/:merchantID",
        exact: true,
        element: <EditMerchant />,
      },
      // systemTier
      { path: "/settings/add-systemtier", exact: true, element: <Add_Systemtier/> },
      { path: "/settings/systemtier-list", exact: true, element: <Systemtier /> },
    
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [{ path: "/auth/login", element: <Login /> }],
  },
  { path: "*", element: <Error /> },
];

export default Router;
