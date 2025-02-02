import React from 'react';
// Import Bootstrap Components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteConfirmationModal = (props) => {
    // Destructure props
    const {
        show,
        handleClose,
        handleConfirm,
        message
    } = props;

    // Modal to confirm deletion
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;