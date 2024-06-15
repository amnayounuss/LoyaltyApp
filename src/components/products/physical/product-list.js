import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Edit } from "react-feather";
// import {  Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { getMerchantListing, getProductListing } from "../../../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { Currency } from "../../../constants/currency";
import { useSelector } from "react-redux";

const Product_list = () => {
  const navigate = useNavigate();

  const merchantList = useSelector(state => state.merchant.merchants);

  const [isFetching, setIsFetching] = useState(false);
  const [productData, setProductData] = useState([]);
  const [selectedMerchant, setselectedMerchant] = useState(null);

  const handleEditClick = (productId) => {
    navigate(`/product/edit-product/${productId}`);
  };

  const fetchMerchantProducts = async () => {
    setIsFetching(true);
    const ResData = await getProductListing(selectedMerchant);
    setProductData(ResData);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchMerchantProducts();
  }, [selectedMerchant]);

  useEffect(() => {
    getMerchantListing();
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Product List" parent="Physical" />
      <Container fluid={true}>
        <Row>
          <Col style={{ marginBottom: "30px" }}>
            <select
              value={selectedMerchant}
              onChange={(e) => setselectedMerchant(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ff8084",
                float: "right",
              }}
            >
              <option value="all">All Merchants</option>
              {merchantList?.map((merchant, m_index) => (
                <option key={m_index} value={merchant?.id}>{merchant?.name}</option>
              ))}
            </select>
          </Col>
        </Row>
        <Row className="products-admin ratio_asos">
          {productData?.map((myData, i) => {
            return (
              <Col xl="3" sm="6" key={i}>
                <Card>
                  <div className="products-admin">
                    <CardBody className="product-box">
                      <div className="img-wrapper">
                        <div className="lable-block">
                          {myData?.tag === "new" ? (
                            <span className="lable3">{myData?.tag}</span>
                          ) : (
                            ""
                          )}
                          {myData?.discount === "on sale" ? (
                            <span className="lable4">{myData?.discount}</span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="front">
                          <a href="/#" className="bg-size">
                            <img
                              alt=""
                              className="img-fluid blur-up bg-img lazyloaded"
                              src={myData?.image1}
                            />
                          </a>
                          <div className="product-hover">
                            <ul>
                              <li>
                                <Button
                                  color="btn"
                                  type="button"
                                  onClick={() => {
                                    handleEditClick(myData?.id);
                                  }}
                                >
                                  <Edit className="editBtn" />
                                </Button>
                              </li>
                              {/* <li>
                                <Button color="btn" type="button">
                                  <Trash2 className="deleteBtn" />
                                </Button>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="product-detail">
                        <h3 style={{ marginTop: "30px" }}>{myData?.title}</h3>
                        <h4>
                          {myData?.price}{Currency.sr}<del>{myData?.discount_price}</del>
                        </h4>
                        {myData.is_active ? (
                          <div style={{ marginTop: "5px" }}>
                            <span
                              style={{ color: "#008000", fontSize: "20px" }}
                            >
                              Active
                            </span>
                          </div>
                        ) : (
                          <div style={{ marginTop: "5px" }}>
                            <span
                              style={{ color: "#ff0000", fontSize: "20px" }}
                            >
                              In-Active
                            </span>
                          </div>
                        )}
                        <ul className="color-variant">
                          {myData?.color?.split(",").map((color, index) => (
                            <li
                              key={index}
                              style={{ backgroundColor: color }}
                            ></li>
                          ))}
                        </ul>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Product_list;
