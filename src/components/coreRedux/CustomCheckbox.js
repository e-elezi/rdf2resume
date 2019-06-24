import React from "react";
import "../core/Form.css";

const CustomCheckbox = ({ input, label }) => (
  <div className="form-check" style={{ marginBottom: "0" }}>
    <label title={label} className="form-check-label">
      {label}
      <input
        checked={input.value ? true : false}
        className="form-control"
        {...input}
        placeholder={label}
        type="checkbox"
      />
      <span className="checkmark" />
    </label>
  </div>
);

export default CustomCheckbox;
