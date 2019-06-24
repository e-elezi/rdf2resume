import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";

const CustomDropdown = ({ input, data, label, valueField, textField }) => {  return (
    <DropdownList
      {...input}
      onBlur={() => input.onBlur()}
      value={input.value}
      data={data}
      valueField={valueField}
      textField={textField}
      placeholder={label}
    />
  );
};

export default CustomDropdown;
