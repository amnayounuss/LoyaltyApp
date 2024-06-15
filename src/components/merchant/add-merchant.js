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

const Add_Merchant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [merchantData, setMerchantData] = useState({
    name: "",
    reference: "",
    url: "",
    email: "",
    password: "",
    db: ""
  });

  const [file, setFile] = useState(null);
  const [dummyimgs, setDummyimgs] = useState([{ img: one }]);
  const [imageForPayload, setImageForPayload] = useState({
    0: null,
  });

  const resetStates = () => {
    setMerchantData({
      name: "",
      reference: "",
      url: "",
      email: "",
      password: "",
    });
    setFile(null);
    setDummyimgs([{ img: one }]);
    setImageForPayload({
      0: null,
    });
  };

  const handleInputChange = (e, key) => {
    setMerchantData((prev) => ({ ...prev, [key]: e.target.value }));
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
    setMerchantData({});
  };

  const handleValidSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", merchantData.name);
      formData.append("reference", merchantData.reference);
      formData.append("url", merchantData.url);
      formData.append("email", merchantData.email);
      formData.append("password", merchantData.password);
      formData.append("db", merchantData.db);

      formData.append("dataType", "merchant");
      formData.append("image1", imageForPayload[0]);

      if (imageForPayload[0]) {
        const response = await axios.post(
          "api/merchant/addNewMerchant",
          formData,
          {
            rawRequest: true,
          }
        );

        if (response.data.isError === false) {
          resetStates();
          successToast("Merchant added successfully");
          navigate("/merchant/merchant-list");
        } else {
          errorToast("Failed to add Merchant");
        }
      } else {
        errorToast("Image is required");
      }
    } catch (error) {
      console.error("Error adding Merchant:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Fragment>
      <Breadcrumb title="Add Merchant" parent="Banner" />

      <Container fluid={true}>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Add Merchant</h5>
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
                              Name :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="text"
                                required
                                value={merchantData?.name ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "name")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Refrence :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="text"
                                required
                                value={merchantData?.reference ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "reference")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              URL :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="text"
                                required
                                value={merchantData?.url ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "url")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Database :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="text"
                                required
                                value={merchantData?.db ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "db")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>
                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Email :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="email"
                                required
                                value={merchantData?.email ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "email")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </FormGroup>

                          <FormGroup className="form-group mb-3 row">
                            <Label className="col-xl-3 col-sm-4 mb-0">
                              Password :
                            </Label>
                            <div className="col-xl-8 col-sm-7">
                              <Input
                                className="form-control"
                                name="product_name"
                                id="validationCustom01"
                                type="text"
                                required
                                value={merchantData?.password ?? ""}
                                onChange={(e) =>
                                  handleInputChange(e, "password")
                                }
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
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

export default Add_Merchant;
