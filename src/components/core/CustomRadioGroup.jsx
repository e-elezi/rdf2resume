import React from "react";
import { Form } from "react-bootstrap";

const CustomRadioGroup = ({ items, name, value, handleChange }) => {
  return (
    <div className="mb-3">
      {items.map(item => {
        return (
          <Form.Check
            key={item["@type"]}
            custom
            type="radio"
            label={item.value}
            checked={item["@type"] === value ? true : false}
            name={name}
            id={item["@type"]}
            onChange={e => handleChange(e)}
          />
        );
      })}
    </div>
  );
};

export default CustomRadioGroup;
