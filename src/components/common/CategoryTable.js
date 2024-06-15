import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { editCategory, getCategoryListing } from "../../utils/apiCalls";
import { Loader } from "react-feather";
import ToggleSwitch from "../../shared/ToggleSwitch";
import ReactSwitch from "react-switch";

const CategoryTable = ({ categoryData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(categoryData);
  const [featureProduct, setFeatureProduct] = useState(false);
  const [uniqueCategory, setUniqueCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ id: "", name: "" });

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleEditClick = (category) => {
    setNewCategory({
      id: category.id,
      name: category.name,
    });
    setFeatureProduct(category.is_featured);
    setUniqueCategory(category.is_unique);
    onOpenModal();
  };

  const handleFeatureProduct = (isChecked) => {
    setFeatureProduct(isChecked);
  };

  const handleUniqueCategory = (isChecked) => {
    setUniqueCategory(isChecked);
  };

  const fetchDataAndSetRows = useCallback(async () => {
    setIsLoading(true);
    setData(null);
    const ResData = await getCategoryListing();
    setData(ResData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataAndSetRows();
  }, [fetchDataAndSetRows]);

  const tableHeaderStyle = {
    padding: "10px",
    textAlign: "left",
    background: "#f2f2f2",
    borderBottom: "1px solid #dee2e6",
  };

  const tableCellStyle = {
    padding: "10px",
    textAlign: "left",
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ borderBottom: "2px solid #dee2e6" }}>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Featured</th>
                <th style={tableHeaderStyle}>Created At</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((category) => (
                <tr
                  key={category.id}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  <td style={tableCellStyle}>{category.id}</td>
                  <td style={tableCellStyle}>{category.name}</td>
                  <td
                    style={{
                      ...tableCellStyle,
                      color: category.is_featured ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {category.is_featured ? "Yes" : "No"}
                  </td>
                  <td style={tableCellStyle}>
                    {category.updatedAt.slice(0, 10)}
                  </td>
                  <td style={tableCellStyle}>
                    <i
                      onClick={() => handleEditClick(category)}
                      className="fa fa-pencil"
                      style={{
                        width: 35,
                        fontSize: 20,
                        padding: 11,
                        cursor: "pointer",
                        color: "rgb(40, 167, 69)",
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={open} toggle={onCloseModal}>
            <ModalHeader
              className="modal-title f-w-600"
              id="exampleModalLabel2"
              toggle={onCloseModal}
            >
              Edit Category
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label htmlFor="recipient-name" className="col-form-label">
                    Category Name :
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={newCategory?.name}
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
                    Featured Category:
                  </Label>
                  <div className="col-xl-6 col-sm-5">
                    <ToggleSwitch
                      label="Toggle Switch"
                      checked={featureProduct}
                      handleToggle={handleFeatureProduct}
                    />
                  </div>
                </FormGroup>

                <FormGroup className="form-group mb-3 row">
                  <Label className="col-xl-5 col-sm-6 mb-0">
                    Unique Category:
                  </Label>
                  <div className="col-xl-6 col-sm-5">
                    <ReactSwitch
                      checked={uniqueCategory}
                      onChange={handleUniqueCategory}
                      onColor="#9400d3"
                      onHandleColor="#800080"
                      handleDiameter={30}
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
                  await editCategory(
                    newCategory,
                    featureProduct,
                    uniqueCategory
                  );
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
      )}
    </>
  );
};

export default CategoryTable;
