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
import { editSystemTier } from "../../utils/apiCalls";
import { Loader } from "react-feather";

const SystemTierTable = ({ systemTierData, fetchDataAndSetRows }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newSystemTier, setNewSystemTier] = useState({ id: "", name: "" });

    const onCloseModal = () => {
        setOpen(false);
        setNewSystemTier({ id: "", name: "" });
    };

    const handleEditClick = (systemTier) => {
        setNewSystemTier({
            id: systemTier.id,
            name: systemTier.name,
        });
        setOpen(true);
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
                                <th style={tableHeaderStyle}>Name</th>
                                <th style={tableHeaderStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemTierData?.map((systemTier) => (
                                <tr key={systemTier.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                    <td style={tableCellStyle}>{systemTier.id}</td>
                                    <td style={tableCellStyle}>{systemTier.name}</td>
                                    <td style={tableCellStyle}>
                                        <i
                                            onClick={() => handleEditClick(systemTier)}
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
                            ))}
                        </tbody>
                    </table>

                    <Modal isOpen={open} toggle={onCloseModal}>
                        <ModalHeader toggle={onCloseModal}>
                            Edit SystemTier
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>SystemTier Name :</Label>
                                    <Input
                                        type="text"
                                        value={newSystemTier.name}
                                        onChange={(e) => {
                                            setNewSystemTier((prev) => ({
                                                ...prev,
                                                name: e.target.value,
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
                                disabled={!newSystemTier.name.length}
                                onClick={async () => {
                                    setIsLoading(true);
                                    await editSystemTier(newSystemTier);
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

export default SystemTierTable;
