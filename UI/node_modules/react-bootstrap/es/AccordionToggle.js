import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useContext } from 'react';
import SelectableContext from './SelectableContext';
var defaultProps = {
  as: 'button'
};
var AccordionToggle = React.forwardRef(function (_ref, ref) {
  var Component = _ref.as,
      children = _ref.children,
      eventKey = _ref.eventKey,
      _onClick = _ref.onClick,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "children", "eventKey", "onClick"]);

  var onSelect = useContext(SelectableContext);
  return React.createElement(Component, _extends({
    ref: ref,
    onClick: function onClick(e) {
      onSelect(eventKey, e);
      if (_onClick) _onClick(e);
    }
  }, props), children);
});
AccordionToggle.defaultProps = defaultProps;
export default AccordionToggle;