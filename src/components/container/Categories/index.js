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
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

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
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const editHandler = () => {
    renderCheckedAndExpandedCategories();
    setShowUpdateCategoryModal(true);
  };
  const renderCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories)
    let checkedArray=[]
    let expandedArray=[]

    // my approach 
    if(checked.length > 0 ){
      checkedArray=categories.filter(({value})=>checked.includes(value))
    }
    if(expanded.length > 0){
      expandedArray=categories.filter(({value})=>expanded.includes(value))
    }
    
    // other approach
    // checked.length > 0 &&
    // checked.forEach((categoryId,i)=>{
    //   const category = categories.find((category,_i)=>categoryId==category.value)
    //   category && checkedArray.push(category)
    // })
    

    // expanded.length > 0 &&
    // expanded.forEach((categoryId,i)=>{
    //   const category = categories.find((category,_i)=>categoryId==category.value)
    //   category && expandedArray.push(category)
    // })

    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
    // console.log("checkedArray :",checkedArray)
    // console.log("expandedArray :",expandedArray)

  };

  const handleUpdateCategoryInput=(key,value,i,type)=>{
    if (type=="checked"){
      const updatedCheckedArray= checkedArray.map((item,_i)=>i==_i ? {...item,[key]:value}:item)
      setCheckedArray(updatedCheckedArray)
    }else if (type=="expanded"){
      const updatedExpandedArray= expandedArray.map((item,_i)=>i==_i ? {...item,[key]:value}:item)
      setExpandedArray(updatedExpandedArray)
    }

  }
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
        <Row>
          <Col md={12}>
            <button onClick={() => {}}>
              <IoIosTrash /> <span>Delete</span>
            </button>
            <button onClick={editHandler}>
              <IoIosCloudUpload /> <span>Edit</span>
            </button>
          </Col>
        </Row>
      </Container>

      {/* Add CategoryModal Starts */}
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
      {/* Add CategoryModal Ends */}

      {/* Update CategoryModal Starts */}

      <Modal
        show={showUpdateCategoryModal}
        onHide={() => setShowUpdateCategoryModal(false)}
        title="Edit Categories"
        onSubmit={() => {}}
      >
        <h1>Expanded Category</h1>
        {expandedArray && expandedArray.map(({name,value,parentId,type},i)=><Row key={i}>
          <Col>
            <Input
              type="text"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e)=>handleUpdateCategoryInput("name",e.target.value,i,"expanded")}
            />
          </Col>
          <Col>
            <select
              className="form-control"
              value={parentId}
              onChange={(e)=>handleUpdateCategoryInput("parentId",e.target.value,i,"expanded")}
            >
              <option >Select Parent Id</option>
              {createCategoryList(category.categories).map((option) => (
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
              onChange={(e)=>handleUpdateCategoryInput("type",e.target.value,i,"expanded")}
            >
              <option >Select List View</option>
              <option value="store">Store</option>
              <option value="shop">shop</option>
              <option value="page">page</option>
            </select>
          </Col>
        </Row>)}


        <h1>Checked Category</h1>
        {checkedArray && checkedArray.map(({name,value,parentId,type},i)=><Row key={i}>
          <Col>
            <Input
              type="text"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e)=>handleUpdateCategoryInput("name",e.target.value,i,"checked")}
            />
          </Col>
          <Col>
            <select
              className="form-control"
              value={parentId}
              onChange={(e)=>handleUpdateCategoryInput("parentId",e.target.value,i,"checked")}
            >
              <option hidden>Select Parent Id</option>
              {createCategoryList(category.categories).map((option) => (
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
              onChange={(e)=>handleUpdateCategoryInput("type",e.target.value,i,"checked")}
            >
              <option hidden>Select List View</option>
              <option value="store">Store</option>
              <option value="shop">shop</option>
              <option value="page">page</option>
            </select>
          </Col>
        </Row>)}
        
      </Modal>

      {/* Update CategoryModal Ends */}
    </Layout>
  );
};

export default Categories;
