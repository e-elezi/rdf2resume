import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";

const RemoveButton = ({ id, classnames, handleClick }) => {
  return (
    <Button
      id={id}
      variant="danger"
      className={classnames}
      onClick={e => handleClick(e)}
    >
      <FontAwesomeIcon icon={faMinus} />
    </Button>
  );
};

export default RemoveButton;
