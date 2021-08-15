import React from "react";
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
        {categoryList.map((option) => (
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
  );
};

export default AddCategoryModal;
