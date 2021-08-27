import React from "react";
import {  Col, Row } from "react-bootstrap";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";

const AddCategoryModal = ({
  show,
  onHide,
  title,
  buttons,
  categoryName,
  setCategoryName,
  parentCategoryId,
  setParentCategoryId,
  categoryList,
  handleCategoryImage,
}) => {
  return (
    <Modal show={show} onHide={onHide} title={title} buttons={buttons}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          {/* <select
            className="form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select> */}
          <Input
              type="select"
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
              options={categoryList}
              placeholder={"Select Category"}
            />
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
