import React from "react";
import Form from "react-bootstrap/Form";
import "./Form.css";

const CustomInput = (props) => {
  return (
    <Form.Group controlId={props.id} className="floating-label mb-2">
      <Form.Control
        className={props.classnames}
        type={props.type}
        placeholder={props.label}
        value={props.value}
        name={props.name}
        onChange={e => props.handleChange(e)}
      >
      </Form.Control>
      <Form.Label>{props.label}</Form.Label>
      {props.children}
    </Form.Group>
  );
};

export default CustomInput;
