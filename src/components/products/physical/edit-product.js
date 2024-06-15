// import MDEditor from "@uiw/react-md-editor";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Row,
} from "reactstrap";

import chroma from "chroma-js";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import Loader from "../../../shared/Loader";
import { errorToast, successToast } from "../../../shared/Toast";
import ToggleSwitch from "../../../shared/ToggleSwitch";
import {
  getCategoryListing,
  getProductById,
} from "../../../utils/apiCalls";
import axios from "../../../utils/axios";
import Breadcrumb from "../../common/breadcrumb";
import { sizes, colors, location } from "../../../constants/productData";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    productCode: "",
    description: "",
    category: "",
    location: "",
  });
  const [productStatus, setProductStatus] = useState(true);
  const [featureProduct, setfeatureProduct] = useState(false);
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

  const resetStates = () => {
    setProductData({
      productName: "",
      price: "",
      description: "",
      category: "",
    });
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
    navigate("/products/product-list");
  };

  const handleValidSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const formData = new FormData();

      formData.append("title", productData.productName);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("is_active", productStatus);
      formData.append("CategoryId", productData.category);
      formData.append("dataType", "product");
      formData.append("image1", imageForPayload[0]);
      formData.append("image2", imageForPayload[1]);
      formData.append("image3", imageForPayload[2]);
      formData.append("image4", imageForPayload[3]);
      formData.append("image5", imageForPayload[4]);
      formData.append("image6", imageForPayload[5]);
      

      if (imageForPayload[0]) {
        const response = await axios.post(
          `/api/products/updateProduct/${productId}`,
          formData,
          {
            rawRequest: true,
          }
        );

        if (response.data.isError === false) {
          resetStates();
          successToast("Product updated successfully");
          navigate("/products/product-list");
        } else {
          errorToast("Failed to add Product");
        }
      } else {
        errorToast("Cover image is required");
      }
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


  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      setLoading(true);
      try {
        const res = await getProductById(productId);

        if (res) {
          setProductData({
            productName: res.title,
            price: res.price,
            description: res.description,
            category: res.CategoryId,
          });

          setDummyimgs([
            { img: res.image1 },
            { img: res.image2 },
            { img: res.image3 },
            { img: res.image4 },
            { img: res.image5 },
            { img: res.image6 },
          ]);

          setImageForPayload({
            0: res.image1,
            1: res.image2,
            2: res.image3,
            3: res.image4,
            4: res.image5,
            5: res.image6,
          });

          setProductStatus(res.is_active);
          setfeatureProduct(res.is_featured);
          if (res.category) setCategoryData([res.category]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndSetRows();
  }, [productId]);

  return (
    <Fragment>
      <Breadcrumb title="Edit Product" parent="Product" />

      <Container fluid={true}>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Edit Product</h5>
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
                                        src={
                                          res.img !== "null" && res.img !== null
                                            ? res.img
                                            : user
                                        }
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
                              Product Name :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                disabled
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
                              Select Category :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <select
                                disabled
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

                        {/* <div
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
                        </div> */}

                        <div className="form">
                          <div className="form form-label-center">
                            <FormGroup className="form-group mb-3 row">
                              <Label className="col-xl-3 col-sm-4 mb-0">
                                Featured Product:
                              </Label>
                              <div className="col-xl-8 col-sm-7">
                                <ToggleSwitch
                                  label="Toggle Switch"
                                  checked={featureProduct}
                                  handleToggle={handleFeatureProduct}
                                />
                              </div>
                            </FormGroup>
                          </div>

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
                            Edit
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

export default EditProduct;
