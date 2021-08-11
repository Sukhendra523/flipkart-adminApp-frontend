import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";

import { addCategory } from "../../../actions";
import Layout from "../../Layout";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Categories = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          value: category._id,
          label: category.name,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
        // <li key={category.name}>
        //   {category.name}
        //   {category.children.length > 0 ? (
        //     <ul>{renderCategories(category.children)}</ul>
        //   ) : null}
        // </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleAddCategory = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("image", categoryImage);

    dispatch(addCategory(form));
    setCategoryName("");
    // setParentCategoryId();
    setCategoryImage(null);

    setShow(false);
  };

  return (
    <Layout sidebar>
      <Container fluid>
        <Row className="mb-md-5 p-md-4">
          <Col
            md={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>Categories</h1>
            <Button variant="primary" onClick={handleShow}>
              Add Category
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <MdCheckBox />,
                uncheck: <MdCheckBoxOutlineBlank />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        title="Add New Category"
        onSubmit={handleAddCategory}
      >
        <Input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(event) => setParentCategoryId(event.target.value)}
        >
          <option hidden>Select Parent Id</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Input
          type="file"
          placeholder="Category Image"
          onChange={handleCategoryImage}
        />
      </Modal>
    </Layout>
  );
};

export default Categories;
