import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { deleteBannerById, getBannerListing } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const Banner_list = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [bannerData, setBannerData] = useState([]);

  const handleEditClick = (bannerId) => {
    navigate(`/banners/edit-banner/${bannerId}`);
  };

  const handleDeleteBanner = async (bannerId) => {
    setIsFetching(true);
    await deleteBannerById(bannerId);
    const ResData = await getBannerListing();
    setBannerData(ResData);
  };

  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      setIsFetching(true);
      const ResData = await getBannerListing();
      setBannerData(ResData);
      setIsFetching(false);
    };

    fetchDataAndSetRows();
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Banner List" parent="Banner" />
      <Container fluid={true}>
        <Row className="products-admin ratio_asos">
          {bannerData?.map((myData, i) => {
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
                              <li>
                                <Button
                                  color="btn"
                                  type="button"
                                  onClick={() => handleDeleteBanner(myData?.id)}
                                >
                                  <Trash2 className="deleteBtn" />
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

export default Banner_list;
