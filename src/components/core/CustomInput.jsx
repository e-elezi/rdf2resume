import React from "react";
import Form from "react-bootstrap/Form";
import "./Form.css";

const CustomInput = ({ id, label, handleChange, type, classnames, value }) => {
  return (
    <Form.Group controlId={id} className="floating-label">
      <Form.Control
        className={classnames}
        type={type}
        placeholder={label}
        value={value}
        onChange={e => handleChange(e)}
      />
      <Form.Label>{label}</Form.Label>
    </Form.Group>
  );
};

export default CustomInput;
