import React from "react";
import { Modal, Button } from "react-bootstrap";
const ModalUi = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUi;
