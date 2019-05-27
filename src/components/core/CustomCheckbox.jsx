import React from "react";
import Form from "react-bootstrap/Form";
import "./Form.css";

const CustomCheckbox = ({
  id,
  type,
  label,
  classnames,
  handleChange,
  checked
}) => {
  let classes = "form-check-input " + classnames;
  return (
    <Form.Group style={{ marginBottom: "0" }}>
      <div className="form-check" style={{ marginBottom: "0" }}>
        <label
          title={label}
          type={type}
          htmlFor={id}
          className="form-check-label"
        >
          {label}
          <input
            type={type}
            id={id}
            className={classes}
            onChange={e => handleChange(e)}
            checked={checked}
          />
          <span className="checkmark" />
        </label>
      </div>
    </Form.Group>
  );
};

export default CustomCheckbox;
