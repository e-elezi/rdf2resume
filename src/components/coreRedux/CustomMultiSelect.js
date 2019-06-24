import React from "react";
import Multiselect from "react-widgets/lib/Multiselect";
import 'react-widgets/dist/css/react-widgets.css';

const CustomMultiSelect = ({ input, data, label, valueField, textField }) =>  (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
    placeholder={label}
  />
);

export default CustomMultiSelect;
