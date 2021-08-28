import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
  let input = null;
  const {
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    errorMessage="",
    options,
  } = props;

  switch (type) {
    case "text":
      input = (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />
          <Form.Text className="text-muted">
            {errorMessage && errorMessage}
          </Form.Text>
        </Form.Group>
      );
      break;
    case "select":
      input = (
        <>
          {label && <Form.Label>{label}</Form.Label>}
          <select className="form-control" value={value} onChange={onChange}>
            <option value="">{placeholder}</option>
            {options?.length > 0 && options.map((option, i) => (
              <option key={i} value={option.value}>
              {option.name}
            </option>
            ))}
          </select>
       </>
      );

      break;
    default:
      input = (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />
          <Form.Text className="text-muted">
            {errorMessage && errorMessage}
          </Form.Text>
        </Form.Group>
      );
      break;
    
  }
  return input
  // const { label, type, placeholder, value, onChange, errorMessage } = props;
  // return (
  //   <Form.Group>
  //     {label && <Form.Label>{label}</Form.Label>}
  //     <Form.Control
  //       type={type}
  //       placeholder={placeholder}
  //       value={value}
  //       onChange={onChange}
  //       {...props}
  //     />
  //     <Form.Text className="text-muted">
  //       {errorMessage && errorMessage}
  //     </Form.Text>
  //   </Form.Group>
  // );
};

export default Input;
