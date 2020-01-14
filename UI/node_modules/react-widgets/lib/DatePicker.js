"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateTimePicker = _interopRequireDefault(require("./DateTimePicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = {
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  onToggle: _propTypes.default.func
};

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DatePicker, _React$Component);

  function DatePicker(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleToggle = function (open) {
      _this.toggleState = !!open;
      if (_this.props.onToggle) _this.props.onToggle(_this.toggleState);else _this.forceUpdate();
    };

    _this.toggleState = props.defaultOpen;
    return _this;
  }

  var _proto = DatePicker.prototype;

  _proto.render = function render() {
    var open = this.props.open;
    open = open === undefined ? this.toggleState : open;
    return _react.default.createElement(_DateTimePicker.default, _extends({}, this.props, {
      time: false,
      open: open ? 'date' : open,
      onToggle: this.handleToggle
    }));
  };

  return DatePicker;
}(_react.default.Component);

DatePicker.propTypes = propTypes;
var _default = DatePicker;
exports.default = _default;
module.exports = exports["default"];