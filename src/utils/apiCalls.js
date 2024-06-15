import { isEmpty } from "lodash";
import { errorToast, successToast } from "../shared/Toast";
import axios from "./axios";
import { store } from "../redux/store";
import { setMerchantList } from "../redux/merchant/reducer";

const getProductListing = async (selectedMerchant) => {
  const params = {
    pageNo: 1,
    pageSize: 1000,
    merchantID: selectedMerchant
  };

  try {
    const { data: response } = await axios.get("/api/products/getAllProducts", {
      params,
    });

    if (response) return response?.data;
    else errorToast(response?.message ?? "Error Loading data");
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getBannerListing = async () => {
  try {
    const response = await axios.get("/api/carousel/getCarouselList");
    const responseData = response?.data;
    if (responseData.isError === false) return responseData?.data;
    else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getCategoryListing = async () => {
  try {
    const response = await axios.get("/api/category/getCategoryList");

    const responseData = response?.data;

    if (responseData) {
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};
const getSystemTierListing = async () => {
  try {
    const response = await axios.get("/api/systemtier/allTiers");
    return response.data;
  } catch (error) {
    console.error("Error fetching system tiers", error);
    errorToast(error.message || "Error loading data");
  }
};
const getMerchantTierListing = async () => {
  try {
    const response = await axios.get("/api/getall/merchantbasetier");
    return response.data;
  } catch (error) {
    console.error("Error fetching merchant tiers", error);
    errorToast(error.message || "Error loading data");
  }
};


const createNewCategory = async (category, featureProduct) => {
  const payload = {
    name: category.name,
    is_featured: featureProduct,
  };

  try {
    const response = await axios.post("/api/category/createCategory", payload);

    if (!isEmpty(response?.data)) {
      return { id: response.data.id, name: response.data.name };
    }
    return null;
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Creating New Category");
    return null;
  }
};

const createNewSystemtier = async (systemtier) => {
  const payload = {
    name: systemtier.name
  };
  try{
    const response = await axios.post("/api/systemtier/create", payload);
    
    if (!isEmpty(response?.data)){
      return {id:response.data.id, name:response.data.name};

    }
    return null;
  }
  catch(error){
    console.log("Error", error);
    errorToast(error?.message ?? "Error Creating New Systemtier");
    return null;
  }
};
const createNewMerchantTier = async (merchantTier) => {
  const payload = {
    systemTierId: merchantTier.systemTierId,
    merchantId: merchantTier.merchantId,
    percentage: merchantTier.percentage,
    eligibilityPoints: merchantTier.eligibilityPoints,
  };

  try {
    const response = await axios.post("/api/merchantbasetier/create", payload);

    if (response?.data) {
      return {
        id: response.data.id,
        percentage: response.data.percentage,
        eligibilityPoints: response.data.eligibilityPoints
      };
    }

    return null;
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Creating New Merchant tier");
    return null;
  }
};

const addProduct = async (payload) => {
  try {
    const response = await axios.post("api/products/createProduct", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.isError === false) {
      successToast(response?.message ?? "Data added sucessfully");
      return response.id;
    }
    errorToast(response?.message ?? "Error adding data");
  } catch (error) {
    console.error("Error", error);
    errorToast(error?.message ?? "Error adding data");
    return false;
  }
};

const addBanner = async (payload) => {
  try {
    const response = await axios.post("api/carousel/addNewCarousel", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.isError === false) {
      successToast(response?.message ?? "Data added sucessfully");
      return response.id;
    }
    errorToast(response?.message ?? "Error adding data");
  } catch (error) {
    console.error("Error", error);
    errorToast(error?.message ?? "Error adding data");
    return false;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `/api/products/getProductById/${productId}`
    );

    const responseData = response?.data;

    if (responseData) {
      return responseData?.data;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getBannerById = async (bannerId) => {
  try {
    const response = await axios.get(
      `/api/carousel/getSingleCarouselByid/${bannerId}`
    );

    const responseData = response?.data;

    if (responseData) {
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const deleteBannerById = async (bannerId) => {
  try {
    const response = await axios.delete(
      `/api/carousel/deleteCarousel/${bannerId}`
    );

    const responseData = response?.data;

    if (responseData) {
      successToast(responseData?.message ?? "Banner Deleted Successfully");
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`/api/products/getCategory/${categoryId}`);

    const responseData = response?.data;

    if (responseData) {
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getUserListing = async () => {
  try {
    const response = await axios.get("/api/user/getUserList");
    const responseData = response?.data;

    if (responseData.isError === false) return responseData?.data;
    else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const editCategory = async (category, featureProduct, uniqueCategory) => {
  const payload = {
    name: category.name,
    is_featured: featureProduct,
    is_unique: uniqueCategory,
  };

  try {
    const response = await axios.post(
      `/api/category/updateCategory/${category.id}`,
      payload
    );

    if (response) {
      successToast(response?.message ?? "Data updated sucessfully");
      return response.id;
    }

    errorToast(response?.message ?? "Error updating data");
  } catch (error) {
    console.error("Error", error);
    errorToast(error?.message ?? "Error updating data");
    return false;
  }
};
const editSystemTier = async (SystemTier) => {
  const payload = {
    name: SystemTier.name,
  };

  try {
    const response = await axios.put(
      `/api/systemtier/${SystemTier.id}`,
      payload
    );

    if (response) {
      successToast(response?.message ?? "Data updated sucessfully");
      return response.id;
    }

    errorToast(response?.message ?? "Error updating data");
  } catch (error) {
    console.error("Error", error);
    errorToast(error?.message ?? "Error updating data");
    return false;
  }
};
const editMerchantTier = async (merchantTier) => {
  const payload = {
    percentage: merchantTier.percentage,
    eligibilityPoints: merchantTier.eligibilityPoints
  };

  try {
    const response = await axios.put(
      `/api/merchantbasetier/updatebyId/${merchantTier.id}`,
      payload
    );

    if (response) {
      successToast(response?.data?.message ?? "Data updated successfully");
      return response.data.id;
    }

    errorToast(response?.data?.message ?? "Error updating data");
  } catch (error) {
    console.error("Error", error);
    errorToast(error?.message ?? "Error updating data");
    return false;
  }
};
const getOrderListing = async (params) => {
  try {
    const response = await axios.get("/api/order/getCompleteOrderList", {
      params,
    });
    const responseData = response?.data;

    if (responseData) {
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const editOrder = async (orderStatus) => {
  const payload = {
    orderId: orderStatus.id,
    status: orderStatus.status,
  };

  console.log(payload);

  try {
    const response = await axios.post("/api/order/updateOrderStatus", payload);
    const responseData = response?.data;

    if (responseData) {
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(
      `/api/order/getOrder/${orderId}`
    );

    const responseData = response?.data;

    if (responseData.isError === false) {
      return responseData?.data;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getMerchantListing = async () => {
  try {
    const response = await axios.get("/api/merchant/getMerchantsList");
    const responseData = response?.data;
    if (responseData.isError === false) {
      store.dispatch(setMerchantList(responseData?.data));
      return responseData?.data
    }
    else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getMerchantByID = async (merchantID) => {
  try {
    const response = await axios.get(
      `/api/merchant/getMerchantByID/${merchantID}`
    );

    const responseData = response?.data;

    if (responseData) {
      return responseData;
    } else {
      console.log(responseData?.message);
      errorToast(responseData?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

const getMerchantDetails = async (merchantID) => {
  try {
    const response = await axios.get(
      `/api/merchant/fetchMerchantData/${merchantID}`
    );

    if (!response?.data?.isError) {
      successToast(response?.data?.message ?? "Merchant Data Loaded");
    } else {
      errorToast(response?.data?.message ?? "Error Loading data");
    }
  } catch (error) {
    console.log("Error", error);
    errorToast(error?.message ?? "Error Loading data");
  }
};

export {
  getProductListing,
  getBannerListing,
  getCategoryListing,
  createNewCategory,
  addProduct,
  getProductById,
  getUserListing,
  getCategoryById,
  editCategory,
  addBanner,
  getBannerById,
  deleteBannerById,
  getOrderListing,
  editOrder,
  getOrderById,
  getMerchantListing,
  getMerchantByID,
  getMerchantDetails,
  createNewSystemtier,
  getSystemTierListing,
  editSystemTier,
  createNewMerchantTier,
  editMerchantTier,
  getMerchantTierListing
};
