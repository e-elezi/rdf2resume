"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _dates = _interopRequireDefault(require("./util/dates"));

var _localizers = require("./util/localizers");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _ = require("./util/_");

var Props = _interopRequireWildcard(require("./util/Props"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isEqual = function isEqual(dateA, dateB) {
  return _dates.default.eq(dateA, dateB, 'day');
};

var MonthView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MonthView, _React$Component);

  function MonthView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          today = _this$props.today,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          culture = _this$props.culture,
          min = _this$props.min,
          max = _this$props.max,
          footerFormat = _this$props.footerFormat,
          dateFormat = _this$props.dateFormat,
          Day = _this$props.dayComponent;
      footerFormat = _localizers.date.getFormat('footer', footerFormat);
      dateFormat = _localizers.date.getFormat('dayOfMonth', dateFormat);
      return _react.default.createElement(_CalendarView.default.Row, {
        key: rowIdx
      }, row.map(function (date, colIdx) {
        var formattedDate = _localizers.date.format(date, dateFormat, culture);

        var label = _localizers.date.format(date, footerFormat, culture);

        return _react.default.createElement(_CalendarView.default.Cell, {
          key: colIdx,
          activeId: activeId,
          label: label,
          date: date,
          now: today,
          min: min,
          max: max,
          unit: "day",
          viewUnit: "month",
          onChange: onChange,
          focused: focused,
          selected: value,
          disabled: disabled
        }, Day ? _react.default.createElement(Day, {
          date: date,
          label: formattedDate
        }) : formattedDate);
      }));
    };

    return _this;
  }

  var _proto = MonthView.prototype;

  _proto.renderHeaders = function renderHeaders(week, format, culture) {
    var firstOfWeek = _localizers.date.firstOfWeek(culture);

    return week.map(function (date) {
      return _react.default.createElement("th", {
        className: "rw-head-cell",
        key: 'header_' + _dates.default.weekday(date, undefined, firstOfWeek)
      }, _localizers.date.format(date, format, culture));
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        focused = _this$props2.focused,
        culture = _this$props2.culture,
        activeId = _this$props2.activeId,
        dayFormat = _this$props2.dayFormat;

    var month = _dates.default.visibleDays(focused, culture);

    var rows = (0, _.chunk)(month, 7);
    dayFormat = _localizers.date.getFormat('weekday', dayFormat);
    return _react.default.createElement(_CalendarView.default, _extends({}, Props.omitOwn(this), {
      activeId: activeId,
      className: (0, _classnames.default)(className, 'rw-calendar-month')
    }), _react.default.createElement("thead", {
      className: "rw-calendar-head"
    }, _react.default.createElement("tr", {
      className: "rw-calendar-row"
    }, this.renderHeaders(rows[0], dayFormat, culture))), _react.default.createElement(_CalendarView.default.Body, null, rows.map(this.renderRow)));
  };

  return MonthView;
}(_react.default.Component);

MonthView.isEqual = isEqual;
MonthView.propTypes = {
  activeId: _propTypes.default.string,
  culture: _propTypes.default.string,
  today: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  dayComponent: CustomPropTypes.elementType,
  dayFormat: CustomPropTypes.dateFormat,
  dateFormat: CustomPropTypes.dateFormat,
  footerFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes.default.bool
};
var _default = MonthView;
exports.default = _default;
module.exports = exports["default"];