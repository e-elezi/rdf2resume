"use strict";

exports.__esModule = true;
exports.default = Footer;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

var _localizers = require("./util/localizers");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  value: _propTypes.default.instanceOf(Date),
  onClick: _propTypes.default.func.isRequired,
  culture: _propTypes.default.string,
  format: CustomPropTypes.dateFormat
};

function Footer(_ref) {
  var disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      value = _ref.value,
      onClick = _ref.onClick,
      culture = _ref.culture,
      format = _ref.format;
  return _react.default.createElement("div", {
    className: "rw-calendar-footer"
  }, _react.default.createElement(_Button.default, {
    disabled: !!(disabled || readOnly),
    onClick: onClick.bind(null, value)
  }, _localizers.date.format(value, _localizers.date.getFormat('footer', format), culture)));
}

Footer.propTypes = propTypes;
module.exports = exports["default"];