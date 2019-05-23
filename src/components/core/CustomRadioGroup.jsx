import React from "react";
import { Form } from "react-bootstrap";

const CustomRadioGroup = ({ items, name, value, handleChange }) => {
  return (
    <div className="mb-3">
      {items.map(item => {
        return (
          <Form.Check
            key={item}
            custom
            inline
            type="radio"
            label={item}
            checked={item === value ? true : false}
            name={name}
            id={item}
            onChange={e => handleChange(e)}
          />
        );
      })}
    </div>
  );
};

export default CustomRadioGroup;
