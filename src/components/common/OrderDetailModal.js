import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
  Col,
  Media,
} from "reactstrap";
import { getOrderById } from "../../utils/apiCalls";
import { useEffect, useState } from "react";

const OrderDetailModal = ({
  selectedOrder,
  setOrderModalOpen,
  orderModalOpen,
}) => {
  const [orderData, setOrderData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderDetails = await getOrderById(selectedOrder?.id);
      setOrderData(orderDetails);
      const transformData = orderDetails?.OrderItems.map((item) => {
        return {
          ...item.Product,
          orderId: item.OrderId,
          ProductId: item.ProductId,
          createdAt: item.createdAt,
          quantity: item?.quantity,
          price: item?.price
        };
      });

      setOrderItems(transformData);
    };

    fetchData();
  }, [selectedOrder?.id]);

  return (
    <Modal
      style={{ minWidth: "80%" }}
      isOpen={orderModalOpen}
      toggle={() => setOrderModalOpen(false)}
    >
      <ModalHeader className="modal-title f-w-600" id="productModalLabel">
        Order Details
      </ModalHeader>
      <ModalBody>
        <div>
          <Row>
            <Col lg="8">
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {orderItems?.map((item, i) => (
                  <Row className="product-order-detail" key={i}>
                    <Col xs="3">
                      <Media
                        src={item.image1}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4 style={{ margin: "10px 0px", fontWeight: 600 }}>
                          product name
                        </h4>
                        <h5>{item.title}</h5>
                      </div>
                    </Col>
                    <Col xs="2" className="order_detail">
                      <div>
                        <h4 style={{ margin: "10px 0px", fontWeight: 600 }}>
                          price
                        </h4>
                        <h5>${item.price}</h5>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col lg="4">
              <Row>
                <Col sm="12">
                  <div
                    style={{
                      border: "1px solid #000",
                      padding: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4>Summary</h4>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <li>
                        <b style={{ marginRight: "4px" }}>Order Id:</b>{" "}
                        {orderData?.id}
                      </li>
                      <li>
                        <b style={{ marginRight: "4px" }}>Order Status: </b>
                        {selectedOrder?.status}
                      </li>
                      <li>
                        <b style={{ marginRight: "4px" }}>Order Id:</b>{" "}
                        {orderData?.id}
                      </li>
                      <li>
                        <b style={{ marginRight: "4px" }}>Order Date:</b>
                        {orderData?.createdAt?.substring(0, 10)}
                      </li>
                      <li>
                        <b style={{ marginRight: "4px" }}>Order Total:</b> $
                        {orderData?.productCost}
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm="12">
                  <div style={{ border: "1px solid #000", padding: "10px" }}>
                    <h4>Shipping Address</h4>
                    <p>{selectedOrder?.address}</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          color="secondary"
          onClick={() => setOrderModalOpen(false)}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderDetailModal;
