import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../../urlConfig";
import { addProduct } from "../../../actions";
import Layout from "../../Layout";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import "./style.css";
const Products = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Category = useSelector((state) => state.category);
  const Products = useSelector((state) => state.products);

  const dispatch = useDispatch();

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
    form.append("category", categoryId);

    for (let image of productImages) {
      form.append("images", image);
    }

    dispatch(addProduct(form));
    setName("");
    setPrice("");
    // setQuantity("");
    // setDescription("");
    // setCategoryId("");
    setProductImages([]);

    setShow(false);
  };

  const renderAddProductModal = () => (
    <Modal
      show={show}
      onHide={handleClose}
      title="Add New Product"
      onSubmit={handleAddProduct}
    >
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
        {createCategoryList(Category.categories).map((option) => (
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
    </Modal>
  );

  const renderProducts = () => (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Products.products.map((product, i) => (
          <tr key={i} onClick={() => showProductDetailsModal(product)}>
            <td>{i}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.category.name}</td>
            <td>--</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
  };

  const hideProductDetailsModal = () => {
    setProductDetailsModal(false);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailsModal}
        onHide={hideProductDetailsModal}
        title="Product Details"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.images.map((image) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(image.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
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
        <Row>
          <Col md={12}>{renderProducts()}</Col>
        </Row>
      </Container>

      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
