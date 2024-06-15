import React, { Fragment, useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../common/breadcrumb";
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
import { createNewSystemtier, getSystemTierListing } from "../../utils/apiCalls";
import SystemTierTable from "../common/SystemTierTable";

const SystemTier = () => {
    const [open, setOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [systemTierData, setSystemTierData] = useState(null);
    const [newSystemTier, setNewSystemTier] = useState({ name: "" });

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setNewSystemTier({ name: "" });
        setOpen(false);
    };

    const fetchDataAndSetRows = useCallback(async () => {
        setIsFetching(true);
        setSystemTierData(null);
        const response = await getSystemTierListing();
        if (response && response.data) {
            setSystemTierData(response.data);
        }
        setIsFetching(false);
    }, []);

    useEffect(() => {
        fetchDataAndSetRows();
    }, [fetchDataAndSetRows]);

    return (
        <Fragment>
            <Breadcrumb title="Tiers" parent="Product" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>All Tiers</h5>
                            </CardHeader>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button
                                        type="button"
                                        color="primary"
                                        onClick={onOpenModal}
                                    >
                                        Add Tier
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            Add SystemTier
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label>SystemTier Name :</Label>
                                                    <Input
                                                        type="text"
                                                        value={newSystemTier.name}
                                                        onChange={(e) => {
                                                            setNewSystemTier({ name: e.target.value });
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                type="button"
                                                color="primary"
                                                disabled={!newSystemTier.name.length}
                                                onClick={async () => {
                                                    await createNewSystemtier(newSystemTier);
                                                    await fetchDataAndSetRows();
                                                    onCloseModal();
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                color="secondary"
                                                onClick={onCloseModal}
                                            >
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    {isFetching ? (
                                        <div>Loading...</div>
                                    ) : systemTierData?.length ? (
                                        <SystemTierTable systemTierData={systemTierData} fetchDataAndSetRows={fetchDataAndSetRows} />
                                    ) : (
                                        <div>No records to display</div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default SystemTier;
