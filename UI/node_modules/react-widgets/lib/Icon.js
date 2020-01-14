"use strict";

exports.__esModule = true;
exports.default = exports.search = exports.clock = exports.calendar = exports.chevronLeft = exports.chevronRight = exports.caretDown = exports.caretUp = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  icon: _propTypes.default.string.isRequired
};

var Icon = function Icon(_ref) {
  var icon = _ref.icon;
  return _react.default.createElement("span", {
    "aria-hidden": "true",
    className: "rw-i rw-i-" + icon
  });
};

Icon.propTypes = propTypes;

var caretUp = _react.default.createElement(Icon, {
  icon: "caret-up"
});

exports.caretUp = caretUp;

var caretDown = _react.default.createElement(Icon, {
  icon: "caret-down"
});

exports.caretDown = caretDown;

var chevronRight = _react.default.createElement(Icon, {
  icon: "chevron-right"
});

exports.chevronRight = chevronRight;

var chevronLeft = _react.default.createElement(Icon, {
  icon: "chevron-left"
});

exports.chevronLeft = chevronLeft;

var calendar = _react.default.createElement(Icon, {
  icon: "calendar"
});

exports.calendar = calendar;

var clock = _react.default.createElement(Icon, {
  icon: "clock-o"
});

exports.clock = clock;

var search = _react.default.createElement(Icon, {
  icon: "search"
});

exports.search = search;
var _default = Icon;
exports.default = _default;