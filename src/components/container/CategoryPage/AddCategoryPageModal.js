import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";

const AddCategoryPageModal = ({
  show,
  onHide,
  modalTitle,
  buttons,
  categoryId,
  onCategoryChange,
  pageTitle,
  setPageTitle,
  desc,
  setDesc,
  banners,
  products,
  handleBannerImages,
  handleProductImages,
  categories,
}) => {
  return (
    <Modal show={show} title={modalTitle} onHide={onHide} buttons={buttons}>
      <Container>
        <Row className="pb-2">
          <Col>
            {/* <select
              className="form-control"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option value="">select category</option>
              {categories?.map((cat,i) => (
                <option key={i} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select> */}
            <Input
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder={"Select Category"}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              value={pageTitle}
              onChange={setPageTitle}
              placeholder={"Page Title"}
              className=""
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              value={desc}
              onChange={setDesc}
              placeholder={"Page Desc"}
              className=""
            />
          </Col>
        </Row>

        {banners?.length > 0
          ? banners?.map((banner, index) => (
              <Row key={index}>
                <Col>{banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              className="form-control"
              type="file"
              name="banners"
              onChange={handleBannerImages}
            />
          </Col>
        </Row>

        {products?.length > 0
          ? products?.map((product, index) => (
              <Row key={index}>
                <Col>{product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              className="form-control"
              type="file"
              name="products"
              onChange={handleProductImages}
            />
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default AddCategoryPageModal;
