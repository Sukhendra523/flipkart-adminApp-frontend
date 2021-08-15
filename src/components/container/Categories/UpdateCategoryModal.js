import React from 'react'
import {  Col, Row } from "react-bootstrap";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";


const UpdateCategoryModal = ({show,onHide,title,buttons,expandedArray,handleUpdateCategoryInput,categoryList,checkedArray}) => {
    return (

      <Modal
      show={show}
      onHide={onHide}
      title={title}
      buttons={buttons}
    >
      <h1>Expanded Category</h1>
      {expandedArray &&
        expandedArray.map(({ name, value, parentId, type }, i) => (
          <Row key={i}>
            <Col>
              <Input
                type="text"
                placeholder="Enter Category Name"
                value={name}
                onChange={(e) =>
                  handleUpdateCategoryInput(
                    "name",
                    e.target.value,
                    i,
                    "expanded"
                  )
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={parentId}
                onChange={(e) =>
                  handleUpdateCategoryInput(
                    "parentId",
                    e.target.value,
                    i,
                    "expanded"
                  )
                }
              >
                <option>Select Parent Id</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={type}
                onChange={(e) =>
                  handleUpdateCategoryInput(
                    "type",
                    e.target.value,
                    i,
                    "expanded"
                  )
                }
              >
                <option>Select List View</option>
                <option value="store">Store</option>
                <option value="shop">shop</option>
                <option value="page">page</option>
              </select>
            </Col>
          </Row>
        ))}

      <h1>Checked Category</h1>
      {checkedArray &&
        checkedArray.map(({ name, value, parentId, type }, i) => (
          <Row key={i}>
            <Col>
              <Input
                type="text"
                placeholder="Enter Category Name"
                value={name}
                onChange={(e) =>
                  handleUpdateCategoryInput(
                    "name",
                    e.target.value,
                    i,
                    "checked"
                  )
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={parentId}
                onChange={(e) =>
                  handleUpdateCategoryInput(
                    "parentId",
                    e.target.value,
                    i,
                    "checked"
                  )
                }
              >
                <option hidden>Select Parent Id</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={type}
                onChange={(e) =>
                  handleUpdateCategoryInput(
                    "type",
                    e.target.value,
                    i,
                    "checked"
                  )
                }
              >
                <option hidden>Select List View</option>
                <option value="store">Store</option>
                <option value="shop">shop</option>
                <option value="page">page</option>
              </select>
            </Col>
          </Row>
        ))}
    </Modal>

    
    )
}

export default UpdateCategoryModal
