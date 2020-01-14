"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _dates = _interopRequireDefault(require("./util/dates"));

var _localizers = require("./util/localizers");

var _ = require("./util/_");

var Props = _interopRequireWildcard(require("./util/Props"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DecadeView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DecadeView, _React$Component);

  function DecadeView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          yearFormat = _this$props.yearFormat,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          min = _this$props.min,
          max = _this$props.max;
      return _react.default.createElement(_CalendarView.default.Row, {
        key: rowIdx
      }, row.map(function (date, colIdx) {
        var label = _localizers.date.format(date, _localizers.date.getFormat('year', yearFormat), culture);

        return _react.default.createElement(_CalendarView.default.Cell, {
          key: colIdx,
          unit: "year",
          activeId: activeId,
          label: label,
          date: date,
          now: today,
          min: min,
          max: max,
          onChange: onChange,
          focused: focused,
          selected: value,
          disabled: disabled
        }, label);
      }));
    };

    return _this;
  }

  var _proto = DecadeView.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        focused = _this$props2.focused,
        activeId = _this$props2.activeId;
    return _react.default.createElement(_CalendarView.default, _extends({}, Props.omitOwn(this), {
      activeId: activeId
    }), _react.default.createElement(_CalendarView.default.Body, null, (0, _.chunk)(getDecadeYears(focused), 4).map(this.renderRow)));
  };

  return DecadeView;
}(_react.default.Component);

DecadeView.propTypes = {
  activeId: _propTypes.default.string,
  culture: _propTypes.default.string,
  today: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  yearFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes.default.bool
};

function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates.default.add(_dates.default.startOf(_date, 'decade'), -2, 'year');

  return days.map(function () {
    return date = _dates.default.add(date, 1, 'year');
  });
}

var _default = DecadeView;
exports.default = _default;
module.exports = exports["default"];