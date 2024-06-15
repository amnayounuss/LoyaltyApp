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
import { editOrder, getOrderListing } from "../../utils/apiCalls";
import Loader from "../../shared/Loader";
import OrderDetailModal from "./OrderDetailModal";

const OrderTable = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [orderStatus, setOrderStatus] = useState({ id: "", status: "" });
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleIdClick = (order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };

  const handleEditClick = async (order) => {
    setOrderStatus({
      id: order.id,
      status: order.status,
    });

    onOpenModal();
  };

  const fetchDataAndSetRows = useCallback(async () => {
    setIsLoading(true);

    const adminLocation = localStorage.getItem("location") ?? "all";
    const params = {
      adminLocation,
    };

    const ResData = await getOrderListing(params);
    setOrderData(ResData?.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataAndSetRows();
  }, [fetchDataAndSetRows]);

  const getStatusColor = (status) => {
    switch (status) {
      case "canceled":
        return "#FF0000"; // Red
      case "pending":
        return "#FFA500"; // Orange
      case "delivered":
        return "#008000"; // Green
      case "shipped":
        return "#0000FF"; // Blue
      default:
        return "#000000"; // Default color
    }
  };

  const statusOptions = ["pending", "shipped", "delivered", "canceled"];

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
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Product Titles</th>
                <th style={tableHeaderStyle}>Address</th>
                <th style={tableHeaderStyle}>Phone Number</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Total Bill</th>
                <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.map((order) => (
                <tr
                  key={order.id}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  <td style={tableCellStyle}>{order.id}</td>
                  <td
                    style={{
                      ...tableCellStyle,
                      fontWeight: 700,
                      color: getStatusColor(order.status),
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={tableCellStyle}>
                    {order.productTittles.map((title, index) => (
                      <p
                        key={index}
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "5px",
                        }}
                      >
                        {title}
                      </p>
                    ))}
                  </td>
                  <td style={tableCellStyle}>{order?.address}</td>
                  <td style={tableCellStyle}>{order?.phone_no}</td>
                  <td style={tableCellStyle}>{order?.userEmail}</td>
                  <td style={tableCellStyle}>${order?.totalBill}</td>
                  <td style={tableCellStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <i
                        className="fa fa-eye"
                        style={{
                          width: 35,
                          fontSize: 20,
                          padding: 11,
                          cursor: "pointer",
                          color: "#ff8084",
                        }}
                        onClick={() => handleIdClick(order)}
                      ></i>
                      <i
                        className="fa fa-pencil"
                        style={{
                          width: 35,
                          fontSize: 20,
                          padding: 11,
                          cursor: "pointer",
                          color: "rgb(40, 167, 69)",
                        }}
                        onClick={() => handleEditClick(order)}
                      ></i>
                    </div>
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
              Edit Order
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label htmlFor="status" className="col-form-label">
                    Order Status:
                  </Label>
                  <Input
                    type="select"
                    id="status"
                    value={orderStatus?.status || ""}
                    onChange={(e) => {
                      setOrderStatus((prevData) => ({
                        ...prevData,
                        status: e.target.value,
                      }));
                    }}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="primary"
                disabled={!orderStatus?.status?.length}
                onClick={async () => {
                  await editOrder(orderStatus);
                  await fetchDataAndSetRows();
                  onCloseModal();
                }}
              >
                Save
              </Button>
              <Button type="button" color="secondary" onClick={onCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <OrderDetailModal
            selectedOrder={selectedOrder}
            orderModalOpen={orderModalOpen}
            setOrderModalOpen={setOrderModalOpen}
          />
        </div>
      )}
    </>
  );
};

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

export default OrderTable;
