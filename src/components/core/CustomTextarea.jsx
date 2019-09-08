import React from "react";
import Form from "react-bootstrap/Form";
import './Form.css'

const CustomTextarea = ({ id, name, label, value, rows ,classnames, handleChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} as="textarea" rows={rows? rows: '3'} value={value} onChange={(e) => handleChange(e)} />
    </Form.Group>
  );
};

export default CustomTextarea;
