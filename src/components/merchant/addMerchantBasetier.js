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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { createNewMerchantTier, getMerchantListing, getMerchantTierListing, getSystemTierListing } from "../../utils/apiCalls";
import MerchTierTable from "../common/MerchTierTable";

const Add_MerchantTier = () => {
    const [open, setOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [merchantTierData, setMerchantTierData] = useState([]);
    const [systemTierData, setSystemTierData] = useState([]);
    const [merchantData, setMerchantData] = useState([]);

    const [newMerchantTier, setNewMerchantTier] = useState({ name: "", eligibilityPoints: "", percentage: "" });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenSystemTier, setDropdownOpenSystemTier] = useState(false);
    const [selectedMerchant, setSelectedMerchant] = useState(null);
    const [selectedSystemTier, setSelectedSystemTier] = useState(null);
    const [newPercentage, setNewPercentage] = useState("");
    const [newEligibilityPoints, setNewEligibilityPoints] = useState("");

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setNewMerchantTier({ name: "", eligibilityPoints: "", percentage: "" });
        setSelectedMerchant(null);
        setSelectedSystemTier(null);
        setNewPercentage("");
        setNewEligibilityPoints("");
        setOpen(false);
    };

    const fetchDataAndSetRows = useCallback(async () => {
        setIsFetching(true);
        setMerchantTierData([]);
        setSystemTierData([]);
        const response = await getMerchantTierListing();
        if (response && response.data) {
            setMerchantTierData(response.data);
        }
        const systemTierResponse = await getSystemTierListing();
        if (systemTierResponse && systemTierResponse.data) {
            setSystemTierData(systemTierResponse.data);
        }
        const ResData = await getMerchantListing();
        if (ResData) {
            setMerchantData(ResData);
        }
        setIsFetching(false);
    }, []);

    useEffect(() => {
        fetchDataAndSetRows();
    }, [fetchDataAndSetRows]);

    const handleSave = async () => {
        if (selectedMerchant && selectedSystemTier && newPercentage && newEligibilityPoints) {
            const newTier = {
                merchantId: selectedMerchant.id,
                systemTierId: selectedSystemTier.id,
                percentage: newPercentage,
                eligibilityPoints: newEligibilityPoints,
            };
            await createNewMerchantTier(newTier);
            await fetchDataAndSetRows();
            onCloseModal();
        }
    };

    return (
        <Fragment>
            <Breadcrumb title="MerchantTier" parent="Product" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Merchant Tiers</h5>
                            </CardHeader>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button
                                        type="button"
                                        color="primary"
                                        onClick={onOpenModal}
                                    >
                                        Add MerchantTier
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            Add Merchant Tier
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="merchantSelect">Select Merchant:</Label>
                                                    <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                                                        <DropdownToggle caret>
                                                            {selectedMerchant
                                                                ? selectedMerchant.name
                                                                : "Select Merchant"}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {merchantData.map((merchant) => (
                                                                <DropdownItem
                                                                    key={merchant.id}
                                                                    onClick={() => setSelectedMerchant(merchant)}
                                                                >
                                                                    {merchant.name}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="systemTierSelect">Select Tier Name:</Label>
                                                    <Dropdown isOpen={dropdownOpenSystemTier} toggle={() => setDropdownOpenSystemTier(!dropdownOpenSystemTier)}>
                                                        <DropdownToggle caret>
                                                            {selectedSystemTier
                                                                ? selectedSystemTier.name
                                                                : "Select System Tier"}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {systemTierData.map((systemTier) => (
                                                                <DropdownItem
                                                                    key={systemTier.id}
                                                                    onClick={() => setSelectedSystemTier(systemTier)}
                                                                >
                                                                    {systemTier.name}
                                                                </DropdownItem>
                                                            ))}
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Percentage:</Label>
                                                    <Input
                                                        type="text"
                                                        value={newPercentage}
                                                        onChange={(e) => setNewPercentage(e.target.value)}
                                                    />
                                                    <Label>Eligibility Points:</Label>
                                                    <Input
                                                        type="text"
                                                        value={newEligibilityPoints}
                                                        onChange={(e) => setNewEligibilityPoints(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                type="button"
                                                color="primary"
                                                disabled={
                                                    !selectedMerchant ||
                                                    !selectedSystemTier ||
                                                    !newPercentage ||
                                                    !newEligibilityPoints
                                                }
                                                onClick={handleSave}
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
                                    ) : merchantTierData.length ? (
                                        <MerchTierTable
                                            merchantTierData={merchantTierData}
                                            systemTierData={systemTierData}
                                            merchantData={merchantData}
                                            fetchDataAndSetRows={fetchDataAndSetRows}
                                        />
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

export default Add_MerchantTier;
