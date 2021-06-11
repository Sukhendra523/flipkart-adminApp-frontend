import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getAllCategory } from "../../../actions";
import Layout from "../../Layout";
import Input from "../../UI/Input";

const Products = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImages, setProductImages] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  // const renderCategories = (categories) => {
  //   let myCategories = [];
  //   for (let category of categories) {
  //     myCategories.push(
  //       <li key={category.name}>
  //         {category.name}
  //         {category.children.length > 0 ? (
  //           <ul>{renderCategories(category.children)}</ul>
  //         ) : null}
  //       </li>
  //     );
  //   }
  //   return myCategories;
  // };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductImage = (e) => {
    setProductImages([...productImages, e.target.files[0]]);
  };

  const handleAddProduct = () => {
    const form = new FormData();

    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("categoryId", categoryId);

    for (let image of productImages) {
      form.append("images", image);
    }

    dispatch(addProduct(form));

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
            <h1>Products</h1>
            <Button variant="primary" onClick={handleShow}>
              Add Products
            </Button>
          </Col>
        </Row>
        {/* <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row> */}
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            placeholder="Enter Product Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            type="number"
            placeholder="Enter Product Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter Product Quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Enter Product description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <select
            className="form-control"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option hidden>Select Parent Id</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          {productImages &&
            productImages.map((productImage, index) => (
              <div key={index}>{productImage.name}</div>
            ))}
          <Input
            type="file"
            placeholder="Product Image"
            onChange={handleProductImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Products;
