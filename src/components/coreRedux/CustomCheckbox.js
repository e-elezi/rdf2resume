import React from "react";
import "../core/Form.css";

const CustomCheckbox = ({ input, label }) => {
  let divClasses = "";
  if (label === undefined) {
    divClasses = "form-check no-label";
  } else {
    divClasses = "form-check";
  }

  return (
    <div className={divClasses} style={{ marginBottom: "0" }}>
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
};

export default CustomCheckbox;
