import React from "react";
import "../core/Form.css";

const CustomInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="floating-label">
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
      <label className="form-label">{label}</label>
    </div>
  );
};

export default CustomInput;
