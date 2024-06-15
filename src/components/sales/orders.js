import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import OrderTable from "../common/OrderTable";

const Orders = () => {
  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Dashboard" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Order Details</h5>
              </CardHeader>
              <CardBody className="order-datatable">
                <OrderTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Orders;
