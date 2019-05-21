import React from "react";
import Button from "react-bootstrap/Button";
import "./Form.css";

const CustomButton = ({ label, classnames, handleClick }) => {
  return (
    <Button variant="primary" className={classnames} onClick={(e) => handleClick(e)}>
      {label}
    </Button>
  );
};

export default CustomButton;
