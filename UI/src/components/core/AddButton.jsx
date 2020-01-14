import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";

const AddButton = ({ id, classnames, handleClick }) => {
  return (
    <Button
      id={id}
      variant="primary"
      className={classnames}
      onClick={e => handleClick(e)}
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
};

export default AddButton;
