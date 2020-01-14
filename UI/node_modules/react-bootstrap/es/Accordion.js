import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import classNames from 'classnames';
import React from 'react';
import useUncontrolled from 'uncontrollable/hook';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext from './AccordionContext';
var defaultProps = {
  as: 'div'
};
var Accordion = React.forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      Component = _useUncontrolled.as,
      activeKey = _useUncontrolled.activeKey,
      bsPrefix = _useUncontrolled.bsPrefix,
      children = _useUncontrolled.children,
      className = _useUncontrolled.className,
      onSelect = _useUncontrolled.onSelect,
      controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, ["as", "activeKey", "bsPrefix", "children", "className", "onSelect"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion');
  return React.createElement(AccordionContext.Provider, {
    value: activeKey
  }, React.createElement(SelectableContext.Provider, {
    value: onSelect
  }, React.createElement(Component, _extends({
    ref: ref
  }, controlledProps, {
    className: classNames(className, bsPrefix)
  }), children)));
});
Accordion.defaultProps = defaultProps;
Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;
export default Accordion;