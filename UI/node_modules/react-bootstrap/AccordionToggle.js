"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _SelectableContext = _interopRequireDefault(require("./SelectableContext"));

var defaultProps = {
  as: 'button'
};

var AccordionToggle = _react.default.forwardRef(function (_ref, ref) {
  var Component = _ref.as,
      children = _ref.children,
      eventKey = _ref.eventKey,
      _onClick = _ref.onClick,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["as", "children", "eventKey", "onClick"]);
  var onSelect = (0, _react.useContext)(_SelectableContext.default);
  return _react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    onClick: function onClick(e) {
      onSelect(eventKey, e);
      if (_onClick) _onClick(e);
    }
  }, props), children);
});

AccordionToggle.defaultProps = defaultProps;
var _default = AccordionToggle;
exports.default = _default;
module.exports = exports["default"];