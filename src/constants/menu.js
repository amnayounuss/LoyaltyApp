import {
  Home,
  Box,
  UserPlus,
  DollarSign,
  Clipboard,
  Square,
  Settings,
  // BarChart,
  // Tag,
  // Camera,
  // AlignLeft,
  // Users,
  // Chrome,
  // Settings,
  // Archive,
  // LogIn,
} from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Merchants",
    icon: Square,
    type: "sub",
    active: false,
    children: [
      {
        path: "/merchant/add-merchant",
        title: "Add Merchant",
        type: "link",
      },
      {
        path: "/merchant/merchant-list",
        title: "Merchants List",
        type: "link",
      },
      {
        path: "/merchant/addMerchantBasetier",
        title: "Merchants tier",
        type: "link",
      },
    ],
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/products/category",
        title: "Category",
        type: "link",
      },
      // {
      //   path: "/products/sub-category",
      //   title: "Sub Category",
      //   type: "link",
      // },
      {
        path: "/products/product-list",
        title: "Product List",
        type: "link",
      },
      // {
      //   path: "/products/edit-product",
      //   title: "Product Detail",
      //   type: "link",
      // },
      {
        path: "/products/add-product",
        title: "Add Product",
        type: "link",
      },
    ],
  },

  {
    title: "Banner",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/banners/add-banner",
        title: "Add Banner",
        type: "link",
      },
      {
        path: "/banners/list-banner",
        title: "List Banner",
        type: "link",
      },
    ],
  },

  // {
  //   title: "Sales",
  //   icon: DollarSign,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/sales/orders", title: "Orders", type: "link" },
  //     { path: "/sales/transactions", title: "Transactions", type: "link" },
  //   ],
  // },

  // {
  //   title: "Coupons",
  //   icon: Tag,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/coupons/list-coupons", title: "List Coupons", type: "link" },
  //     {
  //       path: "/coupons/create-coupons",
  //       title: "Create Coupons",
  //       type: "link",
  //     },
  //   ],
  // },
  {
    title: "Orders",
    icon: DollarSign,
    active: false,
    path: "/orders",
    type: "link",
  },
  // {
  //   title: "Media",
  //   path: "/media",
  //   icon: Camera,
  //   type: "link",
  //   active: false,
  // },
  // {
  //   title: "Menus",
  //   icon: AlignLeft,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/menus/list-menu", title: "List Menu", type: "link" },
  //     { path: "/menus/create-menu", title: "Create Menu", type: "link" },
  //   ],
  // },

  {
    title: "Users",
    icon: UserPlus,
    active: false,
    path: "/users/list-user",
    type: "link",
  },
  {
    title: "Setting",
    icon: Settings,
    type: "sub",
    active: false,
    children: [
      {
        path: "/settings/add-systemtier",
        title: "Add Systemtier",
        type: "link",
      },
      {
        path: "/settings/systemtier-list",
        title: "List systemtier",
        type: "link",
      }
    ],

  },
  // {
  //   title: "Vendors",
  //   icon: Users,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/vendors/list_vendors", title: "Vendor List", type: "link" },
  //     { path: "/vendors/create-vendors", title: "Create Vendor", type: "link" },
  //   ],
  // },
  // {
  //   title: "Localization",
  //   icon: Chrome,
  //   type: "sub",
  //   children: [
  //     {
  //       path: "/localization/transactions",
  //       title: "Translations",
  //       type: "link",
  //     },
  //     {
  //       path: "/localization/currency-rates",
  //       title: "Currency Rates",
  //       type: "link",
  //     },
  //     { path: "/localization/taxes", title: "Taxes", type: "link" },
  //   ],
  // },

  // {
  //   title: "Reports",
  //   path: "/reports/report",
  //   icon: BarChart,
  //   type: "link",
  //   active: false,
  // },

  // {
  //   title: "Settings",
  //   icon: Settings,
  //   type: "sub",
  //   children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  // },
  // {
  //   title: "Invoice",
  //   path: "/invoice",
  //   icon: Archive,
  //   type: "link",
  //   active: false,
  // },
  // {
  //   title: "Login",
  //   path: "/auth/login",
  //   icon: LogIn,
  //   type: "link",
  //   active: false,
  // },
];
