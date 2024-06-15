import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Loader from "../../shared/Loader";
import { errorToast, successToast } from "../../shared/Toast";
import axios from "../../utils/axios";
import Breadcrumb from "../common/breadcrumb";
import { useNavigate } from "react-router-dom";

const Add_Systemtier = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [systemtierData, setSystemtierData] = useState({
        name: "",
    });

    const resetStates = () => {
        setSystemtierData({
            name: "",
        });
    };

    const handleInputChange = (e, key) => {
        setSystemtierData((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleDiscard = () => {
        resetStates();
    };

    const handleValidSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // API call to create a new system tier
            const response = await axios.post("/api/systemtier/create", {
                name: systemtierData.name,
            });

            if (response.data.isError === false) {
                resetStates();
                successToast("Tier added successfully");
                navigate("/settings/systemtier-list");
            } else {
                errorToast("Failed to add Tier");
            }
        } catch (error) {
            errorToast("Error adding tier: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Breadcrumb title="Add Tier" parent="Banner" />
            <Container fluid={true}>
                {loading ? (
                    <Loader />
                ) : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Add Tier</h5>
                                </CardHeader>
                                <CardBody>
                                    <Row className="product-adding">
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
                                                                name="systemtier_name"
                                                                id="validationCustom01"
                                                                type="text"
                                                                required
                                                                value={systemtierData?.name ?? ""}
                                                                onChange={(e) =>
                                                                    handleInputChange(e, "name")
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

export default Add_Systemtier;
