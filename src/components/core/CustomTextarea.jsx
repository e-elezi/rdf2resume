import React from "react";
import Form from "react-bootstrap/Form";
import './Form.css'

const CustomTextarea = ({ id, label, classnames, handleChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="textarea" rows="3" onChange={(e) => handleChange(e)} />
    </Form.Group>
  );
};

export default CustomTextarea;
