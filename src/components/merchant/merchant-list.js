
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { getBannerListing, getMerchantListing } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const Merchant_list = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [merchantData, setMerchantData] = useState([]);

  const handleEditClick = (merchantID) => {
    navigate(`/merchant/edit-merchant/${merchantID}`);
  };

  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      setIsFetching(true);
      const ResData = await getMerchantListing();
      setMerchantData(ResData);
      setIsFetching(false);
    };

    fetchDataAndSetRows();
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Banner List" parent="Banner" />
      <Container fluid={true}>
        <Row className="products-admin ratio_asos">
          {merchantData?.map((myData, i) => {
            return (
              <Col xl="3" sm="6" key={i}>
                <Card>
                  <div className="products-admin">
                    <CardBody className="product-box">
                      <div className="img-wrapper">
                        {/* <div className="lable-block">
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
                        </div> */}
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
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                          {/* <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i> */}
                        </div>

                        <h3 style={{ marginTop: "30px", textAlign: "center" }}>
                          {myData?.name}
                        </h3>
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

export default Merchant_list;
