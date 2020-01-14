"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.default.string,
  component: _propTypes.default.string
};

function ListOptionGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$component = _ref.component,
      component = _ref$component === void 0 ? 'li' : _ref$component;
  var Tag = component;
  return _react.default.createElement(Tag, {
    tabIndex: "-1",
    role: "separator",
    className: (0, _classnames.default)(className, 'rw-list-optgroup')
  }, children);
}

ListOptionGroup.propTypes = propTypes;
var _default = ListOptionGroup;
exports.default = _default;
module.exports = exports["default"];