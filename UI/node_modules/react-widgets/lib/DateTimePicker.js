"use strict";

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _activeElement = _interopRequireDefault(require("dom-helpers/activeElement"));

var _classnames = _interopRequireDefault(require("classnames"));

var _deprecated = _interopRequireDefault(require("prop-types-extra/lib/deprecated"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _Button = _interopRequireDefault(require("./Button"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _DateTimePickerInput = _interopRequireDefault(require("./DateTimePickerInput"));

var _Select = _interopRequireDefault(require("./Select"));

var _TimeList = _interopRequireDefault(require("./TimeList"));

var _messages = require("./messages");

var Props = _interopRequireWildcard(require("./util/Props"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _scrollManager = _interopRequireDefault(require("./util/scrollManager"));

var _interaction = require("./util/interaction");

var _dates = _interopRequireDefault(require("./util/dates"));

var _localizers = require("./util/localizers");

var _widgetHelpers = require("./util/widgetHelpers");

var _Icon = require("./Icon");

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NEXT_VIEW = {
  date: 'time',
  time: 'date'
};

var isBothOrNeither = function isBothOrNeither(a, b) {
  return a && b || !a && !b;
};

var propTypes = _extends({}, _Calendar.default.ControlledComponent.propTypes, {
  /**
   * @example ['valuePicker', [ ['new Date()', null] ]]
   */
  value: _propTypes.default.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * @type {(false | 'time' | 'date')}
   * @example ['openDateTime']
   */
  open: _propTypes.default.oneOf([false, 'time', 'date']),
  onToggle: _propTypes.default.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes.default.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes.default.instanceOf(Date),

  /**
   * The amount of minutes between each entry in the time list.
   *
   * @example ['prop', { step: 90 }]
   */
  step: _propTypes.default.number,
  culture: _propTypes.default.string,

  /**
   * A formatter used to display the date value. For more information about formats
   * visit the [Localization page](/localization)
   *
   * @example ['dateFormat', ['format', "{ raw: 'MMM dd, yyyy' }", null, { defaultValue: 'new Date()', time: 'false' }]]
   */
  format: CustomPropTypes.dateFormat,

  /**
   * A formatter used by the time dropdown to render times. For more information about formats visit
   * the [Localization page](/localization).
   *
   * @example ['dateFormat', ['timeFormat', "{ time: 'medium' }", null, { date: 'false', open: '"time"' }]]
   */
  timeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter to be used while the date input has focus. Useful for showing a simpler format for inputing.
   * For more information about formats visit the [Localization page](/localization)
   *
   * @example ['dateFormat', ['editFormat', "{ date: 'short' }", null, { defaultValue: 'new Date()', format: "{ raw: 'MMM dd, yyyy' }", time: 'false' }]]
   */
  editFormat: CustomPropTypes.dateFormat,

  /**
   * Enable the calendar component of the picker.
   */
  date: _propTypes.default.bool,

  /**
   * Enable the time list component of the picker.
   */
  time: _propTypes.default.bool,

  /** @ignore */
  calendar: (0, _deprecated.default)(_propTypes.default.bool, 'Use `date` instead'),

  /**
   * A customize the rendering of times but providing a custom component.
   */
  timeComponent: CustomPropTypes.elementType,

  /** Specify the element used to render the calendar dropdown icon. */
  dateIcon: _propTypes.default.node,

  /** Specify the element used to render the time list dropdown icon. */
  timeIcon: _propTypes.default.node,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string, _propTypes.default.func]),

  /** @ignore */
  tabIndex: _propTypes.default.any,

  /** @ignore */
  'aria-labelledby': _propTypes.default.string,

  /** @ignore */
  'aria-describedby': _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    dateButton: _propTypes.default.string,
    timeButton: _propTypes.default.string
  })
  /**
   * ---
   * subtitle: DatePicker, TimePicker
   * localized: true
   * shortcuts:
   *   - { key: alt + down arrow, label:  open calendar or time }
   *   - { key: alt + up arrow, label: close calendar or time }
   *   - { key: down arrow, label: move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * @public
   * @extends Calendar
   */

});

var DateTimePicker = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateTimePicker, _React$Component);

  function DateTimePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "handleChange", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyPress", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleDateSelect", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleTimeSelect", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleCalendarClick", _descriptor6, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleTimeClick", _descriptor7, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachCalRef = function (ref) {
      return _this.calRef = ref;
    };

    _this.attachTimeRef = function (ref) {
      return _this.timeRef = ref;
    };

    _this.attachInputRef = function (ref) {
      return _this.inputRef = ref;
    };

    _this.parse = function (string) {
      var _this$props = _this.props,
          parse = _this$props.parse,
          culture = _this$props.culture,
          editFormat = _this$props.editFormat;
      var format = getFormat(_this.props, true);
      !(parse || format || editFormat) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or localizer compatible `format` prop', string) : invariant(false) : void 0;
      var date;
      var formats = [format, editFormat];

      if (typeof parse == 'function') {
        date = parse(string, culture);
        if (date) return date;
      } else {
        // parse is a string format or array of string formats
        formats = formats.concat(parse).filter(Boolean);
      }

      for (var i = 0; i < formats.length; i++) {
        date = _localizers.date.parse(string, formats[i], culture);
        if (date) return date;
      }

      return null;
    };

    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.dateId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_date');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeCalendarId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar_active_cell');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: function didHandle(focused) {
        if (!focused) _this.close();
      }
    });
    _this.state = {
      focused: false,
      messages: (0, _messages.getMessages)(_this.props.messages)
    };
    return _this;
  }

  DateTimePicker.getDerivedStateFromProps = function getDerivedStateFromProps(_ref) {
    var messages = _ref.messages;
    return {
      messages: (0, _messages.getMessages)(messages)
    };
  };

  var _proto = DateTimePicker.prototype;

  _proto.renderInput = function renderInput(owns) {
    var _this$props2 = this.props,
        open = _this$props2.open,
        value = _this$props2.value,
        editFormat = _this$props2.editFormat,
        culture = _this$props2.culture,
        placeholder = _this$props2.placeholder,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly,
        name = _this$props2.name,
        tabIndex = _this$props2.tabIndex,
        autoFocus = _this$props2.autoFocus,
        inputProps = _this$props2.inputProps,
        ariaLabelledby = _this$props2['aria-labelledby'],
        ariaDescribedby = _this$props2['aria-describedby'];
    var focused = this.state.focused;
    var inputReadOnly = inputProps ? inputProps.readOnly : null;
    var activeId = null;

    if (open === 'time') {
      activeId = this.activeOptionId;
    } else if (open === 'date') {
      activeId = this.activeCalendarId;
    }

    return _react.default.createElement(_DateTimePickerInput.default, _extends({}, inputProps, {
      id: this.inputId,
      ref: this.attachInputRef,
      role: "combobox",
      name: name,
      value: value,
      tabIndex: tabIndex,
      autoFocus: autoFocus,
      placeholder: placeholder,
      disabled: disabled,
      readOnly: inputReadOnly != null ? inputReadOnly : readOnly,
      format: getFormat(this.props),
      editFormat: editFormat,
      editing: focused,
      culture: culture,
      parse: this.parse,
      onChange: this.handleChange,
      "aria-haspopup": true,
      "aria-activedescendant": activeId,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-expanded": !!open,
      "aria-owns": owns
    }));
  };

  _proto.renderButtons = function renderButtons() {
    var _this$props3 = this.props,
        date = _this$props3.date,
        dateIcon = _this$props3.dateIcon,
        time = _this$props3.time,
        timeIcon = _this$props3.timeIcon,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly;

    if (!date && !time) {
      return null;
    }

    var messages = this.state.messages;
    return _react.default.createElement(_Select.default, {
      bordered: true
    }, date && _react.default.createElement(_Button.default, {
      icon: dateIcon,
      label: messages.dateButton(),
      disabled: disabled || readOnly,
      onClick: this.handleCalendarClick
    }), time && _react.default.createElement(_Button.default, {
      icon: timeIcon,
      label: messages.timeButton(),
      disabled: disabled || readOnly,
      onClick: this.handleTimeClick
    }));
  };

  _proto.renderCalendar = function renderCalendar() {
    var _this2 = this;

    var activeCalendarId = this.activeCalendarId,
        inputId = this.inputId,
        dateId = this.dateId;
    var _this$props4 = this.props,
        open = _this$props4.open,
        value = _this$props4.value,
        popupTransition = _this$props4.popupTransition,
        dropUp = _this$props4.dropUp,
        onCurrentDateChange = _this$props4.onCurrentDateChange,
        currentDate = _this$props4.currentDate;
    var calendarProps = Props.pick(this.props, _Calendar.default.ControlledComponent); // manually include the last controlled default Props

    calendarProps.defaultView = this.props.defaultView;
    return _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      open: open === 'date',
      className: "rw-calendar-popup",
      transition: popupTransition
    }, _react.default.createElement(_Calendar.default, _extends({}, calendarProps, {
      id: dateId,
      activeId: activeCalendarId,
      tabIndex: "-1",
      value: value,
      autoFocus: false,
      onChange: this.handleDateSelect // #75: need to aggressively reclaim focus from the calendar otherwise
      // disabled header/footer buttons will drop focus completely from the widget
      ,
      onNavigate: function onNavigate() {
        return _this2.focus();
      },
      currentDate: currentDate,
      onCurrentDateChange: onCurrentDateChange,
      "aria-hidden": !open,
      "aria-live": "polite",
      "aria-labelledby": inputId,
      ref: this.attachCalRef
    })));
  };

  _proto.renderTimeList = function renderTimeList() {
    var _this3 = this;

    var activeOptionId = this.activeOptionId,
        inputId = this.inputId,
        listId = this.listId;
    var _this$props5 = this.props,
        open = _this$props5.open,
        value = _this$props5.value,
        min = _this$props5.min,
        max = _this$props5.max,
        step = _this$props5.step,
        currentDate = _this$props5.currentDate,
        dropUp = _this$props5.dropUp,
        date = _this$props5.date,
        culture = _this$props5.culture,
        timeFormat = _this$props5.timeFormat,
        timeComponent = _this$props5.timeComponent,
        timeListProps = _this$props5.timeListProps,
        popupTransition = _this$props5.popupTransition;
    return _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      transition: popupTransition,
      open: open === 'time',
      onEntering: function onEntering() {
        return _this3.timeRef.forceUpdate();
      }
    }, _react.default.createElement("div", null, _react.default.createElement(_TimeList.default, {
      id: listId,
      min: min,
      max: max,
      step: step,
      listProps: timeListProps,
      currentDate: currentDate,
      activeId: activeOptionId,
      format: timeFormat,
      culture: culture,
      value: dateOrNull(value),
      onMove: this.handleScroll,
      onSelect: this.handleTimeSelect,
      preserveDate: !!date,
      itemComponent: timeComponent,
      "aria-labelledby": inputId,
      "aria-live": open && 'polite',
      "aria-hidden": !open,
      messages: this.state.messages,
      ref: this.attachTimeRef
    })));
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        className = _this$props6.className,
        date = _this$props6.date,
        time = _this$props6.time,
        open = _this$props6.open,
        disabled = _this$props6.disabled,
        readOnly = _this$props6.readOnly,
        dropUp = _this$props6.dropUp,
        containerClassName = _this$props6.containerClassName;
    var focused = this.state.focused;
    var elementProps = Props.pickElementProps(this, _Calendar.default.ControlledComponent);
    var shouldRenderList = (0, _widgetHelpers.isFirstFocusedRender)(this);
    var shouldRenderTimeList = !!(shouldRenderList && time);
    var shouldRenderCalendar = !!(shouldRenderList && date);
    var owns = '';
    if (shouldRenderCalendar && open === 'date') owns += this.dateId;
    if (shouldRenderTimeList && open === 'time') owns += ' ' + this.listId;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: !!open,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-datetime-picker')
    }), _react.default.createElement(_WidgetPicker.default, {
      className: containerClassName
    }, this.renderInput(owns.trim()), this.renderButtons()), shouldRenderTimeList && this.renderTimeList(), shouldRenderCalendar && this.renderCalendar());
  };

  _proto.focus = function focus() {
    if (this.inputRef && (0, _activeElement.default)() !== (0, _reactDom.findDOMNode)(this.inputRef)) this.inputRef.focus();
  };

  _proto.toggle = function toggle(view) {
    var open = this.props.open;
    if (!open || open !== view) this.open(view);else this.close();
  };

  _proto.open = function open(view) {
    var _this$props7 = this.props,
        open = _this$props7.open,
        date = _this$props7.date,
        time = _this$props7.time,
        onToggle = _this$props7.onToggle;

    if (!view) {
      if (time) view = 'time';
      if (date) view = 'date';
      if (isBothOrNeither(date, time)) view = NEXT_VIEW[open] || 'date';
    }

    if (open !== view) (0, _widgetHelpers.notify)(onToggle, view);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.inRangeValue = function inRangeValue(value) {
    if (value == null) return value;
    return _dates.default.max(_dates.default.min(value, this.props.max), this.props.min);
  };

  return DateTimePicker;
}(_react.default.Component), _class3.displayName = 'DateTimePicker', _class3.propTypes = propTypes, _class3.defaultProps = _extends({}, _Calendar.default.ControlledComponent.defaultProps, {
  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  date: true,
  time: true,
  open: false,
  dateIcon: _Icon.calendar,
  timeIcon: _Icon.clock
}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleChange", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (date, str, constrain) {
      var _this4$props = _this4.props,
          onChange = _this4$props.onChange,
          value = _this4$props.value;
      if (constrain) date = _this4.inRangeValue(date);

      if (onChange) {
        if (date == null || value == null) {
          if (date != value //eslint-disable-line eqeqeq
          ) onChange(date, str);
        } else if (!_dates.default.eq(date, value)) {
          onChange(date, str);
        }
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      var _this5$props = _this5.props,
          open = _this5$props.open,
          onKeyDown = _this5$props.onKeyDown;
      (0, _widgetHelpers.notify)(onKeyDown, [e]);
      if (e.defaultPrevented) return;
      if (e.key === 'Escape' && open) _this5.close();else if (e.altKey) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();

          _this5.open();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();

          _this5.close();
        }
      } else if (open) {
        if (open === 'date') _this5.calRef.inner.handleKeyDown(e);
        if (open === 'time') _this5.timeRef.handleKeyDown(e);
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyPress", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this6.props.onKeyPress, [e]);
      if (e.defaultPrevented) return;
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleDateSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (date) {
      var format = getFormat(_this7.props),
          dateTime = _dates.default.merge(date, _this7.props.value, _this7.props.currentDate),
          dateStr = formatDate(date, format, _this7.props.culture);

      _this7.close();

      (0, _widgetHelpers.notify)(_this7.props.onSelect, [dateTime, dateStr]);

      _this7.handleChange(dateTime, dateStr, true);

      _this7.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleTimeSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (datum) {
      var format = getFormat(_this8.props),
          dateTime = _dates.default.merge(_this8.props.value, datum.date, _this8.props.currentDate),
          dateStr = formatDate(datum.date, format, _this8.props.culture);

      _this8.close();

      (0, _widgetHelpers.notify)(_this8.props.onSelect, [dateTime, dateStr]);

      _this8.handleChange(dateTime, dateStr, true);

      _this8.focus();
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "handleCalendarClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function () {
      _this9.focus();

      _this9.toggle('date');
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "handleTimeClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function () {
      _this10.focus();

      _this10.toggle('time');
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(DateTimePicker, {
  open: 'onToggle',
  value: 'onChange',
  currentDate: 'onCurrentDateChange'
}, ['focus']);

exports.default = _default;

function getFormat(props) {
  var isDate = props.date != null ? props.date : true;
  var isTime = props.time != null ? props.time : true;
  return props.format ? props.format : isDate && isTime || !isDate && !isTime ? _localizers.date.getFormat('default') : _localizers.date.getFormat(isDate ? 'date' : 'time');
}

function formatDate(date, format, culture) {
  var val = '';
  if (date instanceof Date && !isNaN(date.getTime())) val = _localizers.date.format(date, format, culture);
  return val;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

module.exports = exports["default"];