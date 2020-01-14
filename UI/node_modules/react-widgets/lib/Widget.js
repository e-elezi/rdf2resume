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

var Widget =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Widget, _React$Component);

  function Widget() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Widget.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        tabIndex = _this$props.tabIndex,
        focused = _this$props.focused,
        open = _this$props.open,
        dropUp = _this$props.dropUp,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        autofilling = _this$props.autofilling,
        _this$props$isRtl = _this$props.isRtl,
        isRtl = _this$props$isRtl === void 0 ? this.context.isRtl : _this$props$isRtl,
        props = _objectWithoutProperties(_this$props, ["className", "tabIndex", "focused", "open", "dropUp", "disabled", "readOnly", "autofilling", "isRtl"]);

    tabIndex = tabIndex != null ? tabIndex : '-1';
    return _react.default.createElement("div", _extends({}, props, {
      tabIndex: tabIndex,
      className: (0, _classnames.default)(className, 'rw-widget', isRtl && 'rw-rtl', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus', autofilling && 'rw-webkit-autofill', open && "rw-open" + (dropUp ? '-up' : ''))
    }));
  };

  return Widget;
}(_react.default.Component);

Widget.contextTypes = {
  isRtl: _propTypes.default.bool
};
Widget.propTypes = {
  tabIndex: _propTypes.default.node,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  autofilling: _propTypes.default.bool,
  open: _propTypes.default.bool,
  dropUp: _propTypes.default.bool,
  isRtl: _propTypes.default.bool
};
var _default = Widget;
exports.default = _default;
module.exports = exports["default"];