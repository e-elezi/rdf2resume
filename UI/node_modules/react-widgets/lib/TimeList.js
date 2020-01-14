"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _List = _interopRequireDefault(require("./List"));

var _dates = _interopRequireDefault(require("./util/dates"));

var _reduceToListState = _interopRequireDefault(require("./util/reduceToListState"));

var _localizers = require("./util/localizers");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var format = function format(props) {
  return _localizers.date.getFormat('time', props.format);
};

var accessors = {
  text: function text(item) {
    return item.label;
  },
  value: function value(item) {
    return item.date;
  }
};

var find = function find(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) return arr[i];
  }

  return null;
};

function getBounds(_ref) {
  var min = _ref.min,
      max = _ref.max,
      currentDate = _ref.currentDate,
      value = _ref.value,
      preserveDate = _ref.preserveDate;

  //compare just the time regradless of whether they fall on the same day
  if (!preserveDate) {
    var _start = _dates.default.startOf(_dates.default.merge(new Date(), min, currentDate), 'minutes');

    var _end = _dates.default.startOf(_dates.default.merge(new Date(), max, currentDate), 'minutes');

    if (_dates.default.lte(_end, _start) && _dates.default.gt(max, min, 'day')) _end = _dates.default.tomorrow();
    return {
      min: _start,
      max: _end
    };
  }

  var start = _dates.default.today();

  var end = _dates.default.tomorrow();

  value = value || currentDate || start; //date parts are equal

  return {
    min: _dates.default.eq(value, min, 'day') ? _dates.default.merge(start, min, currentDate) : start,
    max: _dates.default.eq(value, max, 'day') ? _dates.default.merge(start, max, currentDate) : end
  };
}

function getDates(_ref2) {
  var step = _ref2.step,
      culture = _ref2.culture,
      props = _objectWithoutProperties(_ref2, ["step", "culture"]);

  var times = [];

  var _getBounds = getBounds(props),
      min = _getBounds.min,
      max = _getBounds.max;

  var startDay = _dates.default.date(min);

  while (_dates.default.date(min) === startDay && _dates.default.lte(min, max)) {
    times.push({
      date: min,
      label: _localizers.date.format(min, format(props), culture)
    });
    min = _dates.default.add(min, step || 30, 'minutes');
  }

  return times;
}

var TimeList = (0, _reactLifecyclesCompat.polyfill)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimeList, _React$Component);

  function TimeList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};

    _this.handleKeyDown = function (e) {
      var key = e.key;
      var _this$state = _this.state,
          focusedItem = _this$state.focusedItem,
          list = _this$state.list;

      if (key === 'End') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.last()
        });
      } else if (key === 'Home') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.first()
        });
      } else if (key === 'Enter') {
        _this.props.onSelect(focusedItem);
      } else if (key === 'ArrowDown') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.next(focusedItem)
        });
      } else if (key === 'ArrowUp') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.prev(focusedItem)
        });
      }
    };

    return _this;
  }

  TimeList.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        currentDate = nextProps.currentDate,
        step = nextProps.step;
    var data = getDates(nextProps);
    var currentValue = value || currentDate;
    var valueChanged = !prevState.lastValue || !_dates.default.eq(currentValue, prevState.lastValue, 'minutes');
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    var selectedItem = find(data, function (t) {
      return _dates.default.eq(t.date, currentValue, 'minutes');
    });
    var closestDate = find(data, function (t) {
      return Math.abs(_dates.default.diff(t.date, currentValue, 'minutes')) < step;
    });
    return {
      data: data,
      list: list,
      lastValue: currentValue,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem: valueChanged || !prevState.focusedItem ? list.nextEnabled(selectedItem || closestDate || data[0]) : find(data, function (t) {
        return _dates.default.eq(t.date, prevState.focusedItem.date, 'minutes');
      })
    };
  };

  var _proto = TimeList.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        listProps = _this$props.listProps,
        props = _objectWithoutProperties(_this$props, ["listProps"]);

    var _this$state2 = this.state,
        data = _this$state2.data,
        list = _this$state2.list,
        focusedItem = _this$state2.focusedItem,
        selectedItem = _this$state2.selectedItem;
    delete props.currentDate;
    delete props.min;
    delete props.max;
    delete props.step;
    delete props.format;
    delete props.culture;
    delete props.preserveDate;
    delete props.value;
    return _react.default.createElement(_List.default, _extends({}, props, listProps, {
      data: data,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      selectedItem: selectedItem,
      focusedItem: focusedItem
    }));
  };

  return TimeList;
}(_react.default.Component), _class2.defaultProps = {
  step: 30,
  currentDate: new Date(),
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  preserveDate: true
}, _class2.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  step: _propTypes.default.number,
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  currentDate: _propTypes.default.instanceOf(Date),
  itemComponent: CustomPropTypes.elementType,
  listProps: _propTypes.default.object,
  format: CustomPropTypes.dateFormat,
  onSelect: _propTypes.default.func,
  preserveDate: _propTypes.default.bool,
  culture: _propTypes.default.string
}, _temp)) || _class;

var _default = TimeList;
exports.default = _default;
module.exports = exports["default"];