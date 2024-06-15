import { toast } from "react-hot-toast";

export const successToast = (message) => {
  toast.success(message, {
    // custom styles for react-hot-toast that could be called anywhere
    style: {
      background: "#FF8084",
      padding: "16px",
      color: "#ffffff",
    },
    iconTheme: {
      primary: "#FF8084",
      secondary: "#ffffff",
    },
    duration: 5000,
  });
};
export const errorToast = (message) => {
  toast.error(message, {
    // custom styles for react-hot-toast that could be called anywhere
    style: {
      background: "#F73131",
      padding: "16px",
      color: "#ffffff",
    },
    iconTheme: {
      primary: "#F73131",
      secondary: "#ffffff",
    },
    duration: 5000,
  });
};
