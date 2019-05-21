import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const CustomRadioGroup = ({ items, name }) => {
  return (
    <div className="mb-3">
      {items.map(item => {
        return <Form.Check custom inline type="radio" label={item} name={name} id={item} />;
      })}
    </div>
  );
};

export default CustomRadioGroup;
