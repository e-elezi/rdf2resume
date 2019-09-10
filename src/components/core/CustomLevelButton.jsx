import React from "react";
import Button from "react-bootstrap/Button";
import "./Form.css";

const CustomLevelButton = ({ filledNumber, handleClick }) => {
  let map = [1, 2, 3, 4, 5];

  return (
    <div className="custom-level-button-container">
      {map.map(item => {
        return (
          <Button
            key={item}
            id={item}
            className={item <= filledNumber && filledNumber !== ''? 'filled' : '' }
            variant="primary"
            onClick={e => handleClick(e)}
          ></Button>
        );
      })}
    </div>
  );
};

export default CustomLevelButton;
