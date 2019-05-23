import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { CustomMenu, CustomToggleMulti } from "./CustomMenu";

class CustomSelect extends Component {
  state = {};

  render() {
    let {
      placeholder,
      id,
      items,
      handleMultiSelectRemove,
      handleMultiSelectChange,
      value,
      indexSelect
    } = this.props;

    return (
      <Dropdown className="mb-2">
        <Dropdown.Toggle
          as={CustomToggleMulti}
          id="dropdown-custom-components"
          value={value}
          name={id}
          handleRemoveClick={handleMultiSelectRemove}
        >
          {placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          {items.map((item, index) => {
            return (
              <Dropdown.Item
                key={item}
                eventKey={index}
                onClick={e => handleMultiSelectChange(e, id, indexSelect)}
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
