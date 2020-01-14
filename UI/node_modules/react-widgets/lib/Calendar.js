"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _reactComponentManagers = require("react-component-managers");

var _Widget = _interopRequireDefault(require("./Widget"));

var _Header = _interopRequireDefault(require("./Header"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _Month = _interopRequireDefault(require("./Month"));

var _Year = _interopRequireDefault(require("./Year"));

var _Decade = _interopRequireDefault(require("./Decade"));

var _Century = _interopRequireDefault(require("./Century"));

var _messages = require("./messages");

var _SlideTransitionGroup = _interopRequireDefault(require("./SlideTransitionGroup"));

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _localizers = require("./util/localizers");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var Props = _interopRequireWildcard(require("./util/Props"));

var _dates = _interopRequireDefault(require("./util/dates"));

var _widgetHelpers = require("./util/widgetHelpers");

var _interaction = require("./util/interaction");

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var last = function last(a) {
  return a[a.length - 1];
};

var VIEW_UNIT = {
  month: 'day',
  year: 'month',
  decade: 'year',
  century: 'decade'
};
var VIEW_OPTIONS = ['month', 'year', 'decade', 'century'];
var VIEW = {
  month: _Month.default,
  year: _Year.default,
  decade: _Decade.default,
  century: _Century.default
};
var ARROWS_TO_DIRECTION = {
  ArrowDown: 'DOWN',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowLeft: 'LEFT'
};
var OPPOSITE_DIRECTION = {
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};
var MULTIPLIER = {
  year: 1,
  decade: 10,
  century: 100
};

function inRangeValue(_value, min, max) {
  var value = dateOrNull(_value);
  if (value === null) return value;
  return _dates.default.max(_dates.default.min(value, max), min);
}

var propTypes = {
  /** @ignore */
  activeId: _propTypes.default.string,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * @example ['onChangePicker', [ ['new Date()'] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * @example ['valuePicker', [ ['new Date()'] ]]
   */
  value: _propTypes.default.instanceOf(Date),

  /**
   * The minimum date that the Calendar can navigate from.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * The maximum date that the Calendar can navigate to.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes.default.func,

  /** Specify the navigate into the past header icon */
  navigatePrevIcon: _propTypes.default.node,

  /** Specify the navigate into the future header icon */
  navigateNextIcon: _propTypes.default.node,

  /**
   * Controls the currently displayed calendar view. Use `defaultView` to set a unique starting view.
   *
   * @type {("month"|"year"|"decade"|"century")}
   * @controllable onViewChange
   */
  view: function view(props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _propTypes.default.oneOf(props.views || VIEW_OPTIONS).apply(void 0, [props].concat(args));
  },

  /**
   * Defines a list of views the Calendar can traverse through, starting with the
   * first in the list to the last.
   *
   * @type array<"month"|"year"|"decade"|"century">
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(VIEW_OPTIONS)).isRequired,

  /**
   * A callback fired when the `view` changes.
   *
   * @controllable view
   */
  onViewChange: _propTypes.default.func,

  /**
   * Callback fired when the Calendar navigates between views, or forward and backwards in time.
   *
   * @type function(date: ?Date, direction: string, view: string)
   */
  onNavigate: _propTypes.default.func,
  culture: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,

  /**
   * Show or hide the Calendar footer.
   *
   * @example ['prop', ['footer', true]]
   */
  footer: _propTypes.default.bool,

  /**
   * Provide a custom component to render the days of the month. The Component is provided the following props
   *
   * - `date`: a `Date` object for the day of the month to render
   * - `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.
   */
  dayComponent: CustomPropTypes.elementType,

  /**
   * A formatter for the header button of the month view.
   *
   * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
   */
  headerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for the Calendar footer, formats today's Date as a string.
   *
   * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
   */
  footerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
   *
   * @example ['prop', { dayFormat: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
   */
  dayFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for day of the month
   *
   * @example ['prop', { dateFormat: "dt => String(dt.getDate())" }]
   */
  dateFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
   */
  monthFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
   */
  yearFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
   */
  decadeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
   */
  centuryFormat: CustomPropTypes.dateFormat,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    moveBack: _propTypes.default.string,
    moveForward: _propTypes.default.string
  }),
  onKeyDown: _propTypes.default.func,

  /** @ignore */
  tabIndex: _propTypes.default.any
  /**
   * ---
   * localized: true
   * shortcuts:
   *   - { key: ctrl + down arrow, label: navigate to next view }
   *   - { key: ctrl + up arrow, label: navigate to previous view }
   *   - { key: ctrl + left arrow, label: "navigate to previous: month, year, decade, or century" }
   *   - { key: ctrl + right arrow, label: "navigate to next: month, year, decade, or century" }
   *   - { key: left arrow, label:  move focus to previous date}
   *   - { key: right arrow, label: move focus to next date }
   *   - { key: up arrow, label: move focus up within view }
   *   - { key: down key, label: move focus down within view }
   * ---
   *
   * @public
   */

};

var Calendar = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Calendar, _React$Component);

  Calendar.move = function move(date, min, max, unit, direction) {
    var isMonth = unit === 'month';
    var isUpOrDown = direction === 'UP' || direction === 'DOWN';
    var rangeUnit = VIEW_UNIT[unit];
    var addUnit = isMonth && isUpOrDown ? 'week' : VIEW_UNIT[unit];
    var amount = isMonth || !isUpOrDown ? 1 : 4;
    var newDate;
    if (direction === 'UP' || direction === 'LEFT') amount *= -1;
    newDate = _dates.default.add(date, amount, addUnit);
    return _dates.default.inRange(newDate, min, max, rangeUnit) ? newDate : date;
  };

  function Calendar() {
    var _this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleFocusWillChange = function () {
      if (_this.props.tabIndex == -1) return false;
    };

    _initializerDefineProperty(_this, "handleViewChange", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleMoveBack", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleMoveForward", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleChange", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleFooterClick", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor6, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.viewId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar');
    _this.labelId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar_label');
    _this.activeId = _this.props.activeId || (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar_active_cell');
    (0, _reactComponentManagers.autoFocus)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      willHandle: _this.handleFocusWillChange
    });
    var _this$props = _this.props,
        view = _this$props.view,
        views = _this$props.views;
    _this.state = {
      selectedIndex: 0,
      view: view || views[0]
    };
    return _this;
  }

  Calendar.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var messages = _ref.messages,
        view = _ref.view,
        views = _ref.views,
        value = _ref.value,
        currentDate = _ref.currentDate;
    view = view || views[0];
    var slideDirection = prevState.slideDirection,
        lastView = prevState.view,
        lastDate = prevState.currentDate;

    if (lastView !== view) {
      slideDirection = views.indexOf(lastView) > views.indexOf(view) ? 'top' : 'bottom';
    } else if (lastDate !== currentDate) {
      slideDirection = _dates.default.gt(currentDate, lastDate) ? 'left' : 'right';
    }

    return {
      view: view,
      slideDirection: slideDirection,
      messages: (0, _messages.getMessages)(messages),
      currentDate: currentDate || value || new Date()
    };
  };

  var _proto = Calendar.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props2 = this.props,
        value = _this$props2.value,
        min = _this$props2.min,
        max = _this$props2.max;
    var view = this.state.view;
    value = inRangeValue(value, min, max);
    if (!_dates.default.eq(value, dateOrNull(prevProps.value), VIEW_UNIT[view])) this.maybeSetCurrentDate(value);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        value = _this$props3.value,
        footerFormat = _this$props3.footerFormat,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly,
        footer = _this$props3.footer,
        views = _this$props3.views,
        min = _this$props3.min,
        max = _this$props3.max,
        culture = _this$props3.culture,
        tabIndex = _this$props3.tabIndex;
    var _this$state = this.state,
        currentDate = _this$state.currentDate,
        view = _this$state.view,
        slideDirection = _this$state.slideDirection,
        focused = _this$state.focused,
        messages = _this$state.messages;
    var View = VIEW[view],
        todaysDate = new Date(),
        todayNotInRange = !_dates.default.inRange(todaysDate, min, max, view);

    var key = view + '_' + _dates.default[view](currentDate);

    var elementProps = Props.pickElementProps(this),
        viewProps = Props.pick(this.props, View);
    var isDisabled = disabled || readOnly;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      role: "group",
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      tabIndex: tabIndex || 0,
      onKeyDown: this.handleKeyDown,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-calendar rw-widget-container'),
      "aria-activedescendant": this.activeId
    }), _react.default.createElement(_Header.default, {
      isRtl: this.isRtl(),
      label: this.getHeaderLabel(),
      labelId: this.labelId,
      messages: messages,
      upDisabled: isDisabled || view === last(views),
      prevDisabled: isDisabled || !_dates.default.inRange(this.nextDate('LEFT'), min, max, view),
      nextDisabled: isDisabled || !_dates.default.inRange(this.nextDate('RIGHT'), min, max, view),
      onViewChange: this.handleViewChange,
      onMoveLeft: this.handleMoveBack,
      onMoveRight: this.handleMoveForward
    }), _react.default.createElement(Calendar.Transition, {
      direction: slideDirection
    }, _react.default.createElement(View, _extends({}, viewProps, {
      key: key,
      id: this.viewId,
      activeId: this.activeId,
      value: value,
      today: todaysDate,
      disabled: disabled,
      focused: currentDate,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      "aria-labelledby": this.labelId
    }))), footer && _react.default.createElement(_Footer.default, {
      value: todaysDate,
      format: footerFormat,
      culture: culture,
      disabled: disabled || todayNotInRange,
      readOnly: readOnly,
      onClick: this.handleFooterClick
    }));
  };

  _proto.navigate = function navigate(direction, date) {
    var _this$props4 = this.props,
        views = _this$props4.views,
        min = _this$props4.min,
        max = _this$props4.max,
        onNavigate = _this$props4.onNavigate,
        onViewChange = _this$props4.onViewChange;
    var _this$state2 = this.state,
        view = _this$state2.view,
        currentDate = _this$state2.currentDate;
    var slideDir = direction === 'LEFT' || direction === 'UP' ? 'right' : 'left';
    if (direction === 'UP') view = views[views.indexOf(view) + 1] || view;
    if (direction === 'DOWN') view = views[views.indexOf(view) - 1] || view;
    if (!date) date = ['LEFT', 'RIGHT'].indexOf(direction) !== -1 ? this.nextDate(direction) : currentDate;

    if (_dates.default.inRange(date, min, max, view)) {
      (0, _widgetHelpers.notify)(onNavigate, [date, slideDir, view]);
      this.focus(true);
      this.maybeSetCurrentDate(date);
      (0, _widgetHelpers.notify)(onViewChange, [view]);
    }
  };

  _proto.focus = function focus() {
    if (+this.props.tabIndex > -1) (0, _reactDom.findDOMNode)(this).focus();
  };

  _proto.maybeSetCurrentDate = function maybeSetCurrentDate(date) {
    var _this$props5 = this.props,
        min = _this$props5.min,
        max = _this$props5.max;
    var _this$state3 = this.state,
        view = _this$state3.view,
        currentDate = _this$state3.currentDate;
    var inRangeDate = inRangeValue(date ? new Date(date) : currentDate, min, max);
    if (date === currentDate || _dates.default.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[view])) return;
    (0, _widgetHelpers.notify)(this.props.onCurrentDateChange, inRangeDate);
  };

  _proto.nextDate = function nextDate(direction) {
    var method = direction === 'LEFT' ? 'subtract' : 'add';
    var _this$state4 = this.state,
        currentDate = _this$state4.currentDate,
        view = _this$state4.view;
    var unit = view === 'month' ? view : 'year';
    var multi = MULTIPLIER[view] || 1;
    return _dates.default[method](currentDate, 1 * multi, unit);
  };

  _proto.getHeaderLabel = function getHeaderLabel() {
    var _this$props6 = this.props,
        culture = _this$props6.culture,
        decadeFormat = _this$props6.decadeFormat,
        yearFormat = _this$props6.yearFormat,
        headerFormat = _this$props6.headerFormat,
        centuryFormat = _this$props6.centuryFormat;
    var _this$state5 = this.state,
        currentDate = _this$state5.currentDate,
        view = _this$state5.view;

    switch (view) {
      case 'month':
        headerFormat = _localizers.date.getFormat('header', headerFormat);
        return _localizers.date.format(currentDate, headerFormat, culture);

      case 'year':
        yearFormat = _localizers.date.getFormat('year', yearFormat);
        return _localizers.date.format(currentDate, yearFormat, culture);

      case 'decade':
        decadeFormat = _localizers.date.getFormat('decade', decadeFormat);
        return _localizers.date.format(_dates.default.startOf(currentDate, 'decade'), decadeFormat, culture);

      case 'century':
        centuryFormat = _localizers.date.getFormat('century', centuryFormat);
        return _localizers.date.format(_dates.default.startOf(currentDate, 'century'), centuryFormat, culture);
    }
  };

  _proto.isRtl = function isRtl() {
    return !!(this.props.isRtl || this.context && this.context.isRtl);
  };

  _proto.isValidView = function isValidView(next, views) {
    if (views === void 0) {
      views = this.props.views;
    }

    return views.indexOf(next) !== -1;
  };

  return Calendar;
}(_react.default.Component), _class3.displayName = 'Calendar', _class3.propTypes = propTypes, _class3.defaultProps = {
  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  views: VIEW_OPTIONS,
  tabIndex: '0',
  footer: true
}, _class3.contextTypes = {
  isRtl: _propTypes.default.bool
}, _class3.Transition = _SlideTransitionGroup.default, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleViewChange", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      _this2.navigate('UP');
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleMoveBack", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3.navigate('LEFT');
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleMoveForward", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.navigate('RIGHT');
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleChange", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (date) {
      var _this5$props = _this5.props,
          views = _this5$props.views,
          onChange = _this5$props.onChange;
      var view = _this5.state.view;

      if (views[0] === view) {
        _this5.maybeSetCurrentDate(date);

        (0, _widgetHelpers.notify)(onChange, date);

        _this5.focus();

        return;
      }

      _this5.navigate('DOWN', date);
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleFooterClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (date) {
      var _this6$props = _this6.props,
          views = _this6$props.views,
          min = _this6$props.min,
          max = _this6$props.max,
          onViewChange = _this6$props.onViewChange;
      var firstView = views[0];
      (0, _widgetHelpers.notify)(_this6.props.onChange, date);

      if (_dates.default.inRange(date, min, max, firstView)) {
        _this6.focus();

        _this6.maybeSetCurrentDate(date);

        (0, _widgetHelpers.notify)(onViewChange, [firstView]);
      }
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var _this7$state = _this7.state,
          currentDate = _this7$state.currentDate,
          view = _this7$state.view;
      var ctrl = e.ctrlKey || e.metaKey;
      var key = e.key;
      var direction = ARROWS_TO_DIRECTION[key];
      var unit = VIEW_UNIT[view];

      if (key === 'Enter') {
        e.preventDefault();
        return _this7.handleChange(currentDate);
      }

      if (direction) {
        if (ctrl) {
          e.preventDefault();

          _this7.navigate(direction);
        } else {
          if (_this7.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];
          var nextDate = Calendar.move(currentDate, _this7.props.min, _this7.props.max, view, direction);

          if (!_dates.default.eq(currentDate, nextDate, unit)) {
            e.preventDefault();
            if (_dates.default.gt(nextDate, currentDate, view)) _this7.navigate('RIGHT', nextDate);else if (_dates.default.lt(nextDate, currentDate, view)) _this7.navigate('LEFT', nextDate);else _this7.maybeSetCurrentDate(nextDate);
          }
        }
      }

      (0, _widgetHelpers.notify)(_this7.props.onKeyDown, [e]);
    };
  }
})), _class2)) || _class;

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

var _default = (0, _uncontrollable.default)(Calendar, {
  value: 'onChange',
  currentDate: 'onCurrentDateChange',
  view: 'onViewChange'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];