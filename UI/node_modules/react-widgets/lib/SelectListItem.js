"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ListOption = _interopRequireDefault(require("./ListOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SelectListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectListItem, _React$Component);

  function SelectListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;
      if (!disabled) onChange(dataItem, e.target.checked);
    };

    return _this;
  }

  var _proto = SelectListItem.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly,
        name = _this$props2.name,
        type = _this$props2.type,
        checked = _this$props2.checked,
        onMouseDown = _this$props2.onMouseDown,
        props = _objectWithoutProperties(_this$props2, ["children", "disabled", "readOnly", "name", "type", "checked", "onMouseDown"]);

    delete props.onChange;
    return _react.default.createElement(_ListOption.default, _extends({}, props, {
      role: type,
      disabled: disabled,
      "aria-checked": !!checked
    }), _react.default.createElement("label", {
      onMouseDown: onMouseDown,
      className: "rw-select-list-label"
    }, _react.default.createElement("input", {
      name: name,
      type: type,
      tabIndex: "-1",
      checked: checked,
      disabled: disabled || !!readOnly,
      role: "presentation",
      className: "rw-select-list-input",
      onChange: this.handleChange
    }), children));
  };

  return SelectListItem;
}(_react.default.Component);

SelectListItem.propTypes = {
  type: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dataItem: _propTypes.default.any,
  checked: _propTypes.default.bool.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMouseDown: _propTypes.default.func.isRequired
};
var _default = SelectListItem;
exports.default = _default;
module.exports = exports["default"];