import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";

import {
  addCategory,
  deleteCategories,
  getAllCategory,
  updateCategories,
} from "../../../actions";
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
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import AddCategoryModal from "./AddCategoryModal";

const Categories = () => {
  const [show, setShow] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

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
  const categoryList = createCategoryList(category.categories)


  const editHandler = () => {
    createCheckedAndExpandedCategories();
    setShowUpdateCategoryModal(true);
  };
 

  const handleUpdateCategoryInput = (key, value, i, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _i) =>
        i == _i ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _i) =>
        i == _i ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
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

  const handleUpdateCategories = () => {
    const form = new FormData();

    expandedArray.forEach(({ value, name, parentId, type }) => {
      form.append("_id", value);
      form.append("name", name);
      form.append("parentId", parentId ? parentId : "");
      form.append("type", type);
    });

    checkedArray.forEach(({ value, name, parentId, type }) => {
      form.append("_id", value);
      form.append("name", name);
      form.append("parentId", parentId ? parentId : "");
      form.append("type", type);
    });

    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setShowUpdateCategoryModal(false);
      }
    });
  };

  const deleteHanlder=()=>{
    createCheckedAndExpandedCategories()
    setShowDeleteModal(true)
  }

  const handleDeleteCategoies=()=>{
    
    console.log(checked)
    dispatch(deleteCategories(checked)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setShowDeleteModal(false);
      }
    });

  }





  const createCheckedAndExpandedCategories = () => {
    
    let checkedArray = [];
    let expandedArray = [];

    // my approach
    if (checked.length > 0) {
      checkedArray = categoryList.filter(({ value }) => checked.includes(value));
    }
    if (expanded.length > 0) {
      expandedArray = categoryList.filter(({ value }) =>
        expanded.includes(value)
      );
    }

    // other approach
    // checked.length > 0 &&
    // checked.forEach((categoryId,i)=>{
    //   const category = categoryList.find((category,_i)=>categoryId==category.value)
    //   category && checkedArray.push(category)
    // })

    // expanded.length > 0 &&
    // expanded.forEach((categoryId,i)=>{
    //   const category = categoryList.find((category,_i)=>categoryId==category.value)
    //   category && expandedArray.push(category)
    // })

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    // console.log("checkedArray :",checkedArray)
    // console.log("expandedArray :",expandedArray)
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
            <button onClick={deleteHanlder}>
              <IoIosTrash /> <span>Delete</span>
            </button>
            <button onClick={editHandler}>
              <IoIosCloudUpload /> <span>Edit</span>
            </button>
          </Col>
        </Row>
      </Container>

      {/* Add CategoryModal Starts */}
      <AddCategoryModal 
        show={show}
        onHide={handleClose}
        title="Add New Category"
        buttons={[
          {
            label:"Cancel",
            onClick:handleClose,
            classNames:"primary"
          },
          {
            label:"Add",
            onClick:handleAddCategory,
            classNames:"success"
          }
        ]}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      
      {/* Add CategoryModal Ends */}

      {/* Update CategoryModal Starts */}
      
      <UpdateCategoryModal
        show={showUpdateCategoryModal}
        onHide={() => setShowUpdateCategoryModal(false)}
        title="Edit Categories"
        buttons={[
          {
            label:"Cancel",
            onClick:()=>setShowUpdateCategoryModal(false),
            classNames:"primary"
          },
          {
            label:"Update",
            onClick:handleUpdateCategories,
            classNames:"success"
          }
        ]}
        expandedArray={expandedArray}
        handleUpdateCategoryInput={handleUpdateCategoryInput}
        categoryList={categoryList}
        checkedArray={checkedArray}
      />

      {/* Update CategoryModal Ends */}


      {/* Delete CategoryModal Starts */}

      <DeleteCategoryModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete Categories"
        buttons={[
          {
            label:"No",
            onClick:()=>setShowDeleteModal(false),
            classNames:"primary"
          },
          {
            label:"Yes",
            onClick:handleDeleteCategoies,
            classNames:"danger"
          }
        ]}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />

      {/* Delete CategoryModal Ends */}
    </Layout>
  );
};

export default Categories;
