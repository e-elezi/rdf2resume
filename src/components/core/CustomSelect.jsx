import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { CustomToggle, CustomMenu } from "./CustomMenu";

class CustomSelect extends Component {
  state = {};

  render() {
    let { placeholder, handleSelectChange, items, value, id, indexSelect } = this.props;

    return (
      <Dropdown className="mb-2">
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
          value={value}
          name={id}
        >
          {placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          {items.map((item, index) => {
            return (
              <Dropdown.Item
                key={item}
                eventKey={index}
                onClick={e => handleSelectChange(e, id, indexSelect)}
              >
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CustomSelect;
