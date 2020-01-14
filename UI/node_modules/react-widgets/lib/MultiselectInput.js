"use strict";

exports.__esModule = true;
exports.default = void 0;

var _activeElement = _interopRequireDefault(require("dom-helpers/activeElement"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MultiselectInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectInput, _React$Component);

  function MultiselectInput() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MultiselectInput.prototype;

  _proto.focus = function focus() {
    var node = (0, _reactDom.findDOMNode)(this);
    if ((0, _activeElement.default)() === node) return;
    node.focus();
  };

  _proto.select = function select() {
    (0, _reactDom.findDOMNode)(this).select();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        props = _objectWithoutProperties(_this$props, ["disabled", "readOnly"]);

    var size = Math.max((props.value || props.placeholder).length, 1) + 1;
    return _react.default.createElement("input", _extends({}, props, {
      size: size,
      className: "rw-input-reset",
      autoComplete: "off",
      "aria-disabled": disabled,
      "aria-readonly": readOnly,
      disabled: disabled,
      readOnly: readOnly
    }));
  };

  return MultiselectInput;
}(_react.default.Component);

MultiselectInput.propTypes = {
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  maxLength: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
};
var _default = MultiselectInput;
exports.default = _default;
module.exports = exports["default"];