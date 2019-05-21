import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Form } from "react-bootstrap";

const CustomDropdown = ({ id, title, items, classnames }) => {
  return (
    <Form.Group className="dropdown-wrapper">
      <DropdownButton id={id} title={title} className={classnames}>
        {items.map(item => {
          return (
            <Dropdown.Item key={item} href="">
              {item}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </Form.Group>
  );
};

export default CustomDropdown;
