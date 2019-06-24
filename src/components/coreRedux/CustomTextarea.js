import React from "react";
import "../core/Form.css";

const CustomTextareaRedux = ({
  input,
  label,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="textarea-wrapper">
      <label className="form-label">{label}</label>
      <textarea rows={3} className="form-control" {...input} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export default CustomTextareaRedux;
