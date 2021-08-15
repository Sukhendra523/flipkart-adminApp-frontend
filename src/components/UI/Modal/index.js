import React from "react";
import { Modal, Button } from "react-bootstrap";
const ModalUi = ({show,onHide,title,buttons,children}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {buttons && buttons.map(({label,classNames,onClick},i)=><Button key={i} variant={classNames} onClick={onClick}>
          {label}
        </Button>) 
      }
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUi;
