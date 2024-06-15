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

import one from "../../assets/images/pro3/1.jpg";
import Loader from "../../shared/Loader";
import { errorToast, successToast } from "../../shared/Toast";
import ToggleSwitch from "../../shared/ToggleSwitch";
import { createNewCategory, getCategoryListing } from "../../utils/apiCalls";
import axios from "../../utils/axios";
import Breadcrumb from "../common/breadcrumb";
import { useNavigate } from "react-router-dom";

const Add_banner = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    productCode: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState(null);
  const [dummyimgs, setDummyimgs] = useState([{ img: one }]);
  const [imageForPayload, setImageForPayload] = useState({
    0: null,
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
      description: "",
      category: "",
    });
    setFile(null);
    setDummyimgs([{ img: one }]);
    setImageForPayload({
      0: null,
    });
  };

  const handleInputChange = (e, key) => {
    setProductData((prev) => ({ ...prev, [key]: e.target.value }));
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
      setLoading(true);
      const formData = new FormData();

      formData.append("name", productData.productName);
      formData.append("description", productData.description);
      formData.append("CategoryId", productData.category);
      formData.append("dataType", "carousel");
      formData.append("image1", imageForPayload[0]);

      if (imageForPayload[0]) {
        const response = await axios.post(
          "api/carousel/addNewCarousel",
          formData,
          {
            rawRequest: true,
          }
        );

        if (response.data.isError === false) {
          resetStates();
          successToast("Banner added successfully");
          navigate("/banners/list-banner");
        } else {
          errorToast("Failed to add Product");
        }
      } else {
        errorToast("Image is required");
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

  return (
    <Fragment>
      <Breadcrumb title="Add Banner" parent="Banner" />

      <Container fluid={true}>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Add Banner</h5>
                </CardHeader>
                <CardBody>
                  <Row className="product-adding">
                    <Col xl="5">
                      <div className="add-product">
                        <Row>
                          <Col xl="9 xl-50" sm="6 col-9">
                            <div>
                              <img
                                src={dummyimgs[0]?.img}
                                alt=""
                                className="img-fluid image_zoom_1 blur-up lazyloaded"
                              />
                            </div>
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

export default Add_banner;
