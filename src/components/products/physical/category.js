import React, { Fragment, useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../common/breadcrumb";
// import { data } from "../../../assets/data/category";
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
import { createNewCategory, getCategoryListing } from "../../../utils/apiCalls";
import CategoryTable from "../../common/CategoryTable";
import ToggleSwitch from "../../../shared/ToggleSwitch";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [featureProduct, setFeatureProduct] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setNewCategory({ name: "" });
    setFeatureProduct(false);
    setOpen(false);
  };

  const handleFeatureProduct = (isChecked) => {
    setFeatureProduct(isChecked);
  };

  const fetchDataAndSetRows = useCallback(async () => {
    setIsFetching(true);
    setCategoryData(null);
    const ResData = await getCategoryListing();
    setCategoryData(ResData);
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchDataAndSetRows();
  }, [fetchDataAndSetRows]);

  return (
    <Fragment>
      <Breadcrumb title="Category" parent="Product" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Category</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
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
                        <div style={{ margin: "10px 0" }}></div>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-5 col-sm-6 mb-0">
                            Featured Product:
                          </Label>
                          <div className="col-xl-6 col-sm-5">
                            <ToggleSwitch
                              label="Toggle Switch"
                              checked={featureProduct}
                              handleToggle={handleFeatureProduct}
                            />
                          </div>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        disabled={!newCategory?.name?.length}
                        onClick={async () => {
                          await createNewCategory(newCategory, featureProduct);
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
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  {categoryData ? (
                    categoryData.length ? (
                      // <Datatable
                      //   myData={categoryData}
                      //   multiSelectOption={false}
                      //   pageSize={10}
                      //   pagination={true}
                      //   className="-striped -highlight"
                      // />
                      <CategoryTable categoryData={categoryData} />
                    ) : (
                      <div
                        className="sc-hmdomO cTsUPQ"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                      >
                        <div style={{ padding: 24 }}>
                          There are no records to display
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className="sc-hmdomO cTsUPQ"
                      style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                    >
                      <div style={{ padding: 24 }}>Loading...</div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Category;
