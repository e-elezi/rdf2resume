"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = require("./Icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Header, _React$Component);

  function Header() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        messages = _this$props.messages,
        label = _this$props.label,
        labelId = _this$props.labelId,
        onMoveRight = _this$props.onMoveRight,
        onMoveLeft = _this$props.onMoveLeft,
        onViewChange = _this$props.onViewChange,
        prevDisabled = _this$props.prevDisabled,
        upDisabled = _this$props.upDisabled,
        nextDisabled = _this$props.nextDisabled,
        _this$props$navigateP = _this$props.navigatePrevIcon,
        navigatePrevIcon = _this$props$navigateP === void 0 ? _Icon.chevronLeft : _this$props$navigateP,
        _this$props$navigateN = _this$props.navigateNextIcon,
        navigateNextIcon = _this$props$navigateN === void 0 ? _Icon.chevronRight : _this$props$navigateN,
        isRtl = _this$props.isRtl;
    return _react.default.createElement("div", {
      className: "rw-calendar-header"
    }, _react.default.createElement(_Button.default, {
      className: "rw-calendar-btn-left",
      onClick: onMoveLeft,
      disabled: prevDisabled,
      label: messages.moveBack(),
      icon: isRtl ? navigateNextIcon : navigatePrevIcon
    }), _react.default.createElement(_Button.default, {
      id: labelId,
      onClick: onViewChange,
      className: "rw-calendar-btn-view",
      disabled: upDisabled,
      "aria-live": "polite",
      "aria-atomic": "true"
    }, label), _react.default.createElement(_Button.default, {
      className: "rw-calendar-btn-right",
      onClick: onMoveRight,
      disabled: nextDisabled,
      label: messages.moveForward(),
      icon: isRtl ? navigatePrevIcon : navigateNextIcon
    }));
  };

  return Header;
}(_react.default.Component);

Header.propTypes = {
  label: _propTypes.default.string.isRequired,
  labelId: _propTypes.default.string,
  upDisabled: _propTypes.default.bool.isRequired,
  prevDisabled: _propTypes.default.bool.isRequired,
  nextDisabled: _propTypes.default.bool.isRequired,
  onViewChange: _propTypes.default.func.isRequired,
  onMoveLeft: _propTypes.default.func.isRequired,
  onMoveRight: _propTypes.default.func.isRequired,
  navigatePrevIcon: _propTypes.default.node,
  navigateNextIcon: _propTypes.default.node,
  messages: _propTypes.default.shape({
    moveBack: _propTypes.default.func.isRequired,
    moveForward: _propTypes.default.func.isRequired
  }),
  isRtl: _propTypes.default.bool
};
var _default = Header;
exports.default = _default;
module.exports = exports["default"];