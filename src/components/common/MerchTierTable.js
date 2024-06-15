import React, { useState } from "react";
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
import { Accordion, Card } from "react-bootstrap";
import { Loader } from "react-feather";
import { editMerchantTier } from "../../utils/apiCalls";
import 'bootstrap/dist/css/bootstrap.min.css';

export const MerchTierTable = ({ merchantTierData, fetchDataAndSetRows, systemTierData, merchantData }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newMerchantTier, setNewMerchantTier] = useState({ id: "", eligibilityPoints: "", percentage: "" });
    const [openAccordion, setOpenAccordion] = useState("");

    const onCloseModal = () => {
        setOpen(false);
        setNewMerchantTier({ id: "", eligibilityPoints: "", percentage: "" });
    };

    const handleEditClick = (merchantTier) => {
        setNewMerchantTier({
            id: merchantTier.id,
            eligibilityPoints: merchantTier.eligibilityPoints,
            percentage: merchantTier.percentage
        });
        setOpen(true);
    };

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? "" : id);
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

    // Group merchant tiers by merchantId
    const groupedMerchantTiers = merchantTierData?.reduce((acc, tier) => {
        if (!acc[tier.merchantId]) {
            acc[tier.merchantId] = [];
        }
        acc[tier.merchantId].push(tier);
        return acc;
    }, {});

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Accordion defaultActiveKey={openAccordion}>
                        {Object.entries(groupedMerchantTiers || {}).map(([merchantId, tiers]) => {
                            const merchant = merchantData?.find(item => item.id === parseInt(merchantId));
                            return (
                                <Card key={merchantId}>
                                    <Accordion.Toggle as={Card.Header} eventKey={merchantId.toString()} onClick={() => toggleAccordion(merchantId.toString())}>
                                        {merchant?.name || "Unknown Merchant"}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={merchantId.toString()}>
                                        <Card.Body>
                                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                                <thead style={{ borderBottom: "2px solid #dee2e6" }}>
                                                    <tr>
                                                        <th style={tableHeaderStyle}>ID</th>
                                                        <th style={tableHeaderStyle}>System Tier Name</th>
                                                        <th style={tableHeaderStyle}>Eligibility Points</th>
                                                        <th style={tableHeaderStyle}>Percentage</th>
                                                        <th style={tableHeaderStyle}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tiers.map((merchantTier) => {
                                                        const systemtier = systemTierData?.find(item => item.id === merchantTier.systemTierId);
                                                        return (
                                                            <tr key={merchantTier.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                                                <td style={tableCellStyle}>{merchantTier.id}</td>
                                                                <td style={tableCellStyle}>{systemtier?.name}</td>
                                                                <td style={tableCellStyle}>{merchantTier.eligibilityPoints}</td>
                                                                <td style={tableCellStyle}>{merchantTier.percentage}</td>
                                                                <td style={tableCellStyle}>
                                                                    <i
                                                                        onClick={() => handleEditClick(merchantTier)}
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
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            );
                        })}
                    </Accordion>

                    <Modal isOpen={open} toggle={onCloseModal}>
                        <ModalHeader toggle={onCloseModal}>
                            Edit MerchantTier
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Eligibility Points :</Label>
                                    <Input
                                        type="text"
                                        value={newMerchantTier.eligibilityPoints}
                                        onChange={(e) => {
                                            setNewMerchantTier((prev) => ({
                                                ...prev,
                                                eligibilityPoints: e.target.value,
                                            }));
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Percentage :</Label>
                                    <Input
                                        type="text"
                                        value={newMerchantTier.percentage}
                                        onChange={(e) => {
                                            setNewMerchantTier((prev) => ({
                                                ...prev,
                                                percentage: e.target.value,
                                            }));
                                        }}
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="button"
                                color="primary"
                                disabled={!newMerchantTier.id}
                                onClick={async () => {
                                    setIsLoading(true);
                                    await editMerchantTier(newMerchantTier);
                                    await fetchDataAndSetRows();
                                    onCloseModal();
                                    setIsLoading(false);
                                }}
                            >
                                Save
                            </Button>
                            <Button type="button" color="secondary" onClick={onCloseModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default MerchTierTable;
