// import MDEditor from "@uiw/react-md-editor";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import chroma from "chroma-js";
import Select from "react-select";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import Loader from "../../../shared/Loader";
import { errorToast, successToast } from "../../../shared/Toast";
import ToggleSwitch from "../../../shared/ToggleSwitch";
import { createNewCategory, getCategoryListing } from "../../../utils/apiCalls";
import axios from "../../../utils/axios";
import Breadcrumb from "../../common/breadcrumb";
import { sizes, colors, location } from "../../../constants/productData";
import { useNavigate } from "react-router-dom";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const Add_product = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [productData, setProductData] = useState({
    productName: "",
    price: 1,
    productCode: "",
    description: "",
    category: "",
    location: location[0].value,
  });
  const [quantity, setQuantity] = useState(1);
  const [productStatus, setProductStatus] = useState(true);
  const [featureProduct, setfeatureProduct] = useState(false);
  const [sizeValue, setSizeValue] = useState([]);
  const [colorValue, setColorValue] = useState([]);
  const [file, setFile] = useState(null);
  const [dummyimgs, setDummyimgs] = useState([
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
  ]);
  const [imageForPayload, setImageForPayload] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const [categoryData, setCategoryData] = useState([]);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setNewCategory({ name: "" });
    setOpen(false);
  };

  const resetStates = () => {
    setProductData({
      productName: "",
      price: "",
      productCode: "",
      description: "",
      category: "",
      location: "",
    });
    setSizeValue([]);
    setColorValue([]);
    setQuantity(1);
    setFile(null);
    setDummyimgs([
      { img: user },
      { img: user },
      { img: user },
      { img: user },
      { img: user },
      { img: user },
    ]);
    setImageForPayload({
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    });
  };

  const handleInputChange = (e, key) => {
    let newValue = e.target.value;

    if (key === "price") {
      const parsedValue = parseFloat(newValue);

      if (!isNaN(parsedValue) && parsedValue >= 1) newValue = parsedValue;
      else newValue = 1;
    }

    setProductData((prev) => ({ ...prev, [key]: newValue }));
  };

  const IncrementItem = () => {
    setQuantity((prev) => prev + 1);
  };
  const DecreaseItem = () => {
    if (quantity >= 2) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);

    if (!isNaN(newQuantity)) {
      setQuantity(Math.max(1, newQuantity));
    }
  };

  const handleToggle = (isChecked) => {
    setProductStatus(isChecked);
  };

  const handleFeatureProduct = (isChecked) => {
    setfeatureProduct(isChecked);
  };

  //	image upload

  const _handleImgChange = (e, i) => {
    e.preventDefault();

    const imageForBody = e.target.files[0];
    setImageForPayload((prev) => {
      prev[i] = imageForBody;
      return { ...prev };
    });

    let reader = new FileReader();
    const image = e.target.files[0];
    reader.onload = () => {
      dummyimgs[i].img = reader.result;
      setFile({ file: file });
      setDummyimgs(dummyimgs);
    };
    reader.readAsDataURL(image);
  };

  const handleDiscard = () => {
    setProductData({});
  };

  const handleValidSubmit = async (e) => {
    e.preventDefault();
    try {
      const size = sizeValue.map((option) => option.value);
      const color = colorValue.map((option) => option.value);

      setLoading(true);
      const formData = new FormData();

      formData.append("code", productData.productCode);
      formData.append("title", productData.productName);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("CategoryId", productData.category);
      formData.append("is_active", productStatus);
      formData.append("dataType", "product");
      formData.append("location", productData.location);
      formData.append("image1", imageForPayload[0]);
      formData.append("image2", imageForPayload[1]);
      formData.append("image3", imageForPayload[2]);
      formData.append("image4", imageForPayload[3]);
      formData.append("image5", imageForPayload[4]);
      formData.append("image6", imageForPayload[5]);

      if (imageForPayload[0] && productData.category) {
        const response = await axios.post(
          "api/products/createProduct",
          formData,
          {
            rawRequest: true,
          }
        );

        if (response.data.isError === false) {
          resetStates();
          successToast("Product added successfully");
          navigate("/products/product-list");
        } else {
          errorToast("Failed to add Product");
        }
      }
      if (!imageForPayload[0]) errorToast("Cover image is required");
      if (!productData.category) errorToast("Please Select a Category");
    } catch (error) {
      console.error("Error adding Product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAndSetRows = useCallback(async () => {
    setLoading(true);
    setCategoryData(null);
    const ResData = await getCategoryListing();
    setCategoryData(ResData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDataAndSetRows();
  }, [fetchDataAndSetRows]);

  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Product" />

      <Container fluid={true}>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Add Product</h5>
                </CardHeader>
                <CardBody>
                  <Row className="product-adding">
                    <Col xl="5">
                      <div className="add-product">
                        <Row>
                          <Col xl="9 xl-50" sm="6 col-9">
                            <img
                              src={dummyimgs[0].img ?? one}
                              alt=""
                              className="img-fluid image_zoom_1 blur-up lazyloaded"
                            />
                          </Col>
                          <Col xl="3 xl-50" sm="6 col-3">
                            <ul className="file-upload-product">
                              {dummyimgs.map((res, i) => {
                                return (
                                  <li key={i}>
                                    <div className="box-input-file">
                                      <Input
                                        className="upload"
                                        type="file"
                                        onChange={(e) => _handleImgChange(e, i)}
                                      />
                                      <img
                                        alt=""
                                        src={res.img}
                                        style={{ width: 50, height: 50 }}
                                      />
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col xl="7">
                      <Form
                        className="needs-validation add-product-form"
                        onSubmit={handleValidSubmit}
                      >
                        <div className="form form-label-center">
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Product Location:
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <select
                                className="form-control digits"
                                id="exampleFormControlSelect1"
                                value={productData?.location ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "location")
                                }
                              >
                                <option value="" disabled>
                                  Select Location
                                </option>
                                {location?.map((location) => (
                                  <option
                                    key={location.value}
                                    value={location.value}
                                  >
                                    {location.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Product Name :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="text"
                                required
                                value={productData?.productName ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "productName")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>

                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Price :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control mb-0"
                                name="price"
                                id="validationCustom02"
                                type="number"
                                required
                                value={productData?.price ?? ""}
                                onChange={(e) => handleInputChange(e, "price")}
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Product Code :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control "
                                name="product_code"
                                id="validationCustomUsername"
                                type="number"
                                required
                                value={productData?.productCode ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "productCode")
                                }
                              />
                            </div>
                            <div className="invalid-feedback offset-sm-4 offset-xl-3">
                              Please choose Valid Code.
                            </div>
                          </FormGroup>

                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Select Category :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <select
                                className="form-control digits"
                                id="exampleFormControlSelect1"
                                value={productData?.category ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "category")
                                }
                              >
                                <option value="" disabled>
                                  Select Category
                                </option>
                                {categoryData?.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </FormGroup>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                          className="col-xl-11 col-sm-11"
                        >
                          <Button
                            type="button"
                            color="primary"
                            onClick={onOpenModal}
                            data-toggle="modal"
                            data-original-title="test"
                            data-target="#exampleModal"
                          >
                            Add Category
                          </Button>
                          <Modal isOpen={open} toggle={onCloseModal}>
                            <ModalHeader
                              className="modal-title f-w-600"
                              id="exampleModalLabel2"
                              toggle={onCloseModal}
                            >
                              Add Category
                            </ModalHeader>
                            <ModalBody>
                              <Form>
                                <FormGroup>
                                  <Label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                  >
                                    Category Name :
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    value={newCategory.name}
                                    onChange={(e) => {
                                      setNewCategory((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                      }));
                                    }}
                                  />
                                </FormGroup>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                type="button"
                                color="primary"
                                disabled={!newCategory?.name?.length}
                                onClick={async () => {
                                  await createNewCategory(newCategory);
                                  await fetchDataAndSetRows();
                                  onCloseModal("VaryingMdo");
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                type="button"
                                color="secondary"
                                onClick={() => onCloseModal("VaryingMdo")}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </div>

                        <div className="form">
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Select Size :
                            </Label>
                            <div
                              className="col-xl-8 col-sm-7"
                              style={{ zIndex: "10" }}
                            >
                              <Select
                                isMulti
                                name="size"
                                value={sizeValue ?? "s"}
                                options={sizes}
                                classNamePrefix="select"
                                onChange={(e) => setSizeValue(e)}
                              />
                            </div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Select Color :
                            </Label>
                            <div
                              className="col-xl-8 col-sm-7"
                              style={{ zIndex: "5" }}
                            >
                              <Select
                                isMulti
                                name="color"
                                value={colorValue ?? ""}
                                options={colors}
                                styles={colourStyles}
                                classNamePrefix="select"
                                onChange={(e) => setColorValue(e)}
                              />
                            </div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Total Products :
                            </Label>
                            <fieldset className="qty-box ms-0">
                              <div
                                style={{ width: "130px" }}
                                className="input-group bootstrap-touchspin"
                              >
                                <div className="input-group-prepend">
                                  <Button
                                    className="btn btn-primary btn-square bootstrap-touchspin-down"
                                    type="button"
                                    onClick={DecreaseItem}
                                  >
                                    <i className="fa fa-minus"></i>
                                  </Button>
                                </div>
                                <div className="input-group-prepend">
                                  <span className="input-group-text bootstrap-touchspin-prefix"></span>
                                </div>
                                <Input
                                  className="touchspin form-control"
                                  type="text"
                                  value={quantity}
                                  onChange={handleChange}
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                </div>
                                <div className="input-group-append ms-0">
                                  <Button
                                    className="btn btn-primary btn-square bootstrap-touchspin-up"
                                    type="button"
                                    onClick={IncrementItem}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </Button>
                                </div>
                              </div>
                            </fieldset>
                          </FormGroup>

                          <div className="form form-label-center">
                            <FormGroup className="form-group mb-3 row">
                              <Label className="col-xl-3 col-sm-4 mb-0">
                                Product Status:
                              </Label>
                              <div className="col-xl-8 col-sm-7">
                                <ToggleSwitch
                                  label="Toggle Switch"
                                  checked={productStatus}
                                  handleToggle={handleToggle}
                                />
                              </div>
                            </FormGroup>
                          </div>

                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4">
                              Add Description:
                            </Label>
                            <div className="col-xl-8 col-sm-7 description-sm">
                              <Input
                                className="form-control "
                                name="product_code"
                                id="validationCustomUsername"
                                type="textarea"
                                required
                                value={productData?.description ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "description")
                                }
                              />
                            </div>
                          </FormGroup>
                        </div>
                        <div className="offset-xl-3 offset-sm-4">
                          <Button type="submit" color="primary">
                            Add
                          </Button>
                          <Button
                            onClick={handleDiscard}
                            type="button"
                            color="light"
                          >
                            Discard
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};

export default Add_product;
