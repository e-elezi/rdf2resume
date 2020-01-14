"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Loading = function Loading() {
  return _react.default.createElement("span", {
    "aria-hidden": "true",
    className: "rw-i rw-loading"
  });
};

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        disabled = _this$props.disabled,
        label = _this$props.label,
        icon = _this$props.icon,
        busy = _this$props.busy,
        active = _this$props.active,
        children = _this$props.children,
        _this$props$variant = _this$props.variant,
        variant = _this$props$variant === void 0 ? 'primary' : _this$props$variant,
        _this$props$spinner = _this$props.spinner,
        spinner = _this$props$spinner === void 0 ? _react.default.createElement(Loading, null) : _this$props$spinner,
        _this$props$component = _this$props.component,
        Tag = _this$props$component === void 0 ? 'button' : _this$props$component,
        props = _objectWithoutProperties(_this$props, ["className", "disabled", "label", "icon", "busy", "active", "children", "variant", "spinner", "component"]);

    var type = props.type;
    if (Tag === 'button') type = type || 'button';
    return _react.default.createElement(Tag, _extends({}, props, {
      tabIndex: "-1",
      title: label,
      type: type,
      disabled: disabled,
      "aria-disabled": disabled,
      "aria-label": label,
      className: (0, _classnames.default)(className, 'rw-btn', active && !disabled && 'rw-state-active', variant && 'rw-btn-' + variant)
    }), busy ? spinner : icon, children);
  };

  return Button;
}(_react.default.Component);

Button.propTypes = {
  disabled: _propTypes.default.bool,
  label: _propTypes.default.string,
  icon: _propTypes.default.node,
  busy: _propTypes.default.bool,
  active: _propTypes.default.bool,
  variant: _propTypes.default.oneOf(['primary', 'select']),
  component: _propTypes.default.any,
  spinner: _propTypes.default.node
};
var _default = Button;
exports.default = _default;
module.exports = exports["default"];