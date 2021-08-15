import React from 'react'
import Modal from "../../UI/Modal";

const DeleteCategoryModal = ({show,onHide,title,buttons,expandedArray,checkedArray}) => {
    return (
        <Modal
        show={show}
        onHide={onHide}
        title={title}
        buttons={buttons}
      >
        <h1>checked Category</h1>
        <ul>
          {checkedArray.length > 0 &&
            checkedArray.map(({name},i) => <li key={i}>{name}</li>)}
        </ul>

        <h1>Expanded Category</h1>
        <ul>
          {expandedArray.length > 0 &&
            expandedArray.map(({name},i) => <li key={i}>{name}</li>)}
        </ul>
      </Modal>
    )
}

export default DeleteCategoryModal
