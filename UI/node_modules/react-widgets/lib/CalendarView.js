"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dates = _interopRequireDefault(require("./util/dates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return _dates.default.max(_dates.default.min(date, max), min);
}

var CalendarView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CalendarView, _React$Component);

  function CalendarView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CalendarView.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        activeId = _this$props.activeId,
        props = _objectWithoutProperties(_this$props, ["className", "activeId"]);

    return _react.default.createElement("table", _extends({}, props, {
      role: "grid",
      tabIndex: "-1",
      "aria-activedescendant": activeId || null,
      className: (0, _classnames.default)(className, 'rw-nav-view', 'rw-calendar-grid')
    }));
  };

  return CalendarView;
}(_react.default.Component);

CalendarView.propTypes = {
  activeId: _propTypes.default.string
};

var CalendarViewCell =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(CalendarViewCell, _React$Component2);

  function CalendarViewCell() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;

    _this.handleChange = function () {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          min = _this$props2.min,
          max = _this$props2.max,
          date = _this$props2.date;
      onChange(clamp(date, min, max));
    };

    return _this;
  }

  var _proto2 = CalendarViewCell.prototype;

  _proto2.isEmpty = function isEmpty() {
    var _this$props3 = this.props,
        unit = _this$props3.unit,
        min = _this$props3.min,
        max = _this$props3.max,
        date = _this$props3.date;
    return !_dates.default.inRange(date, min, max, unit);
  };

  _proto2.isEqual = function isEqual(date) {
    return _dates.default.eq(this.props.date, date, this.props.unit);
  };

  _proto2.isFocused = function isFocused() {
    return !this.props.disabled && !this.isEmpty() && this.isEqual(this.props.focused);
  };

  _proto2.isNow = function isNow() {
    return this.props.now && this.isEqual(this.props.now);
  };

  _proto2.isOffView = function isOffView() {
    var _this$props4 = this.props,
        viewUnit = _this$props4.viewUnit,
        focused = _this$props4.focused,
        date = _this$props4.date;
    return date && focused && viewUnit && _dates.default[viewUnit](date) !== _dates.default[viewUnit](focused);
  };

  _proto2.isSelected = function isSelected() {
    return this.props.selected && this.isEqual(this.props.selected);
  };

  _proto2.render = function render() {
    var _this$props5 = this.props,
        children = _this$props5.children,
        activeId = _this$props5.activeId,
        label = _this$props5.label,
        disabled = _this$props5.disabled;
    var isDisabled = disabled || this.isEmpty();
    return _react.default.createElement("td", {
      role: "gridcell",
      id: this.isFocused() ? activeId : null,
      title: label,
      "aria-label": label,
      "aria-readonly": disabled,
      "aria-selected": this.isSelected(),
      onClick: !isDisabled ? this.handleChange : undefined,
      className: (0, _classnames.default)('rw-cell', this.isNow() && 'rw-now', isDisabled && 'rw-state-disabled', this.isEmpty() && 'rw-cell-not-allowed', this.isOffView() && 'rw-cell-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected')
    }, children);
  };

  return CalendarViewCell;
}(_react.default.Component);

CalendarViewCell.propTypes = {
  id: _propTypes.default.string,
  activeId: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  now: _propTypes.default.instanceOf(Date),
  date: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  unit: _propTypes.default.oneOf(['day'].concat(VIEW_UNITS)),
  viewUnit: _propTypes.default.oneOf(VIEW_UNITS),
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool
};

CalendarView.Body = function (props) {
  return _react.default.createElement("tbody", _extends({
    className: "rw-calendar-body"
  }, props));
};

CalendarView.Row = function (props) {
  return _react.default.createElement("tr", _extends({
    role: "row",
    className: "rw-calendar-row"
  }, props));
};

CalendarView.Cell = CalendarViewCell;
var _default = CalendarView;
exports.default = _default;
module.exports = exports["default"];