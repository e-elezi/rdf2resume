import React from "react";
import Form from "react-bootstrap/Form";
import './Form.css'

const CustomTextarea = ({ id, label, value, classnames, handleChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="textarea" rows="3" value={value} onChange={(e) => handleChange(e)} />
    </Form.Group>
  );
};

export default CustomTextarea;
