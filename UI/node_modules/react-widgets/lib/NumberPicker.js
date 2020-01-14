"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _Select = _interopRequireDefault(require("./Select"));

var _NumberInput = _interopRequireDefault(require("./NumberInput"));

var _Button = _interopRequireDefault(require("./Button"));

var _messages = require("./messages");

var Props = _interopRequireWildcard(require("./util/Props"));

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _interaction = require("./util/interaction");

var _widgetHelpers = require("./util/widgetHelpers");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _localizers = require("./util/localizers");

var _Icon = require("./Icon");

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var format = function format(props) {
  return _localizers.number.getFormat('default', props.format);
}; // my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge


function createInterval(callback) {
  var _fn;

  var id,
      cancel = function cancel() {
    return clearTimeout(id);
  };

  id = setTimeout(_fn = function fn() {
    id = setTimeout(_fn, 35);
    callback(); //fire after everything in case the user cancels on the first call
  }, 500);
  return cancel;
}

function clamp(value, min, max) {
  max = max == null ? Infinity : max;
  min = min == null ? -Infinity : min;
  if (value == null || value === '') return null;
  return Math.max(Math.min(value, max), min);
}
/**
 * ---
 * localized: true
 * shortcuts:
 *   - { key: down arrow, label: decrement value }
 *   - { key: up arrow, label: increment value }
 *   - { key: home, label: set value to minimum value, if finite }
 *   - { key: end, label: set value to maximum value, if finite }
 * ---
 *
 * @public
 */


var NumberPicker = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NumberPicker, _React$Component);

  function NumberPicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "handleMouseDown", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleMouseUp", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleChange = function (rawValue, originalEvent) {
      if (originalEvent === void 0) {
        originalEvent = null;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          lastValue = _this$props.value,
          min = _this$props.min,
          max = _this$props.max;
      var nextValue = clamp(rawValue, min, max);
      if (lastValue !== nextValue) (0, _widgetHelpers.notify)(onChange, [nextValue, {
        rawValue: rawValue,
        lastValue: lastValue,
        originalEvent: originalEvent
      }]);
    };

    _this.attachInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      willHandle: function willHandle(focused) {
        if (focused) _this.focus();
      }
    });
    _this.state = {
      focused: false
    };
    return _this;
  }

  NumberPicker.getDerivedStateFromProps = function getDerivedStateFromProps(_ref) {
    var messages = _ref.messages;
    return {
      messages: (0, _messages.getMessages)(messages)
    };
  };

  var _proto = NumberPicker.prototype;

  _proto.renderInput = function renderInput(value) {
    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        autoFocus = _this$props2.autoFocus,
        tabIndex = _this$props2.tabIndex,
        parse = _this$props2.parse,
        name = _this$props2.name,
        onKeyPress = _this$props2.onKeyPress,
        onKeyUp = _this$props2.onKeyUp,
        min = _this$props2.min,
        max = _this$props2.max,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly,
        inputProps = _this$props2.inputProps,
        format = _this$props2.format,
        culture = _this$props2.culture;
    return _react.default.createElement(_NumberInput.default, _extends({}, inputProps, {
      role: "spinbutton",
      tabIndex: tabIndex,
      value: value,
      placeholder: placeholder,
      autoFocus: autoFocus,
      editing: this.state.focused,
      format: format,
      culture: culture,
      parse: parse,
      name: name,
      min: min,
      max: max,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onKeyPress: onKeyPress,
      onKeyUp: onKeyUp,
      nodeRef: this.attachInputRef
    }));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        className = _this$props3.className,
        containerClassName = _this$props3.containerClassName,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly,
        value = _this$props3.value,
        min = _this$props3.min,
        max = _this$props3.max,
        incrementIcon = _this$props3.incrementIcon,
        decrementIcon = _this$props3.decrementIcon;
    var _this$state = this.state,
        focused = _this$state.focused,
        messages = _this$state.messages;
    var elementProps = Props.pickElementProps(this);
    value = clamp(value, min, max);
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onKeyDown: this.handleKeyDown,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-number-picker')
    }), _react.default.createElement(_WidgetPicker.default, {
      className: containerClassName
    }, this.renderInput(value), _react.default.createElement(_Select.default, {
      bordered: true
    }, _react.default.createElement(_Button.default, {
      icon: incrementIcon,
      onClick: this.handleFocus,
      disabled: value === max || disabled,
      label: messages.increment({
        value: value,
        min: min,
        max: max
      }),
      onMouseUp: function onMouseUp(e) {
        return _this2.handleMouseUp('UP', e);
      },
      onMouseDown: function onMouseDown(e) {
        return _this2.handleMouseDown('UP', e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.handleMouseUp('UP', e);
      }
    }), _react.default.createElement(_Button.default, {
      icon: decrementIcon,
      onClick: this.handleFocus,
      disabled: value === min || disabled,
      label: messages.decrement({
        value: value,
        min: min,
        max: max
      }),
      onMouseUp: function onMouseUp(e) {
        return _this2.handleMouseUp('DOWN', e);
      },
      onMouseDown: function onMouseDown(e) {
        return _this2.handleMouseDown('DOWN', e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.handleMouseUp('DOWN', e);
      }
    }))));
  };

  _proto.focus = function focus() {
    this.inputRef.focus();
  };

  _proto.increment = function increment(event) {
    return this.step(this.props.step, event);
  };

  _proto.decrement = function decrement(event) {
    return this.step(-this.props.step, event);
  };

  _proto.step = function step(amount, event) {
    var value = (this.props.value || 0) + amount;
    var decimals = this.props.precision != null ? this.props.precision : _localizers.number.precision(format(this.props));
    this.handleChange(decimals != null ? round(value, decimals) : value, event);
    return value;
  };

  return NumberPicker;
}(_react.default.Component), _class3.propTypes = {
  value: _propTypes.default.number,

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min: _propTypes.default.number,

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max: _propTypes.default.number,

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step: _propTypes.default.number,

  /**
   * Specify how precise the `value` should be when typing, incrementing, or decrementing the value.
   * When empty, precision is parsed from the current `format` and culture.
   */
  precision: _propTypes.default.number,
  culture: _propTypes.default.string,

  /**
   * A format string used to display the number value. Localizer dependent, read [localization](../localization) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format: CustomPropTypes.numberFormat,

  /**
   * Determines how the NumberPicker parses a number from the localized string representation.
   * You can also provide a parser `function` to pair with a custom `format`.
   */
  parse: _propTypes.default.func,
  incrementIcon: _propTypes.default.node,
  decrementIcon: _propTypes.default.node,

  /** @ignore */
  tabIndex: _propTypes.default.any,
  name: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,

  /**
   * @example ['disabled', ['1']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['1.5']]
   */
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    increment: _propTypes.default.string,
    decrement: _propTypes.default.string
  })
}, _class3.defaultProps = {
  value: null,
  open: false,
  incrementIcon: _Icon.caretUp,
  decrementIcon: _Icon.caretDown,
  min: -Infinity,
  max: Infinity,
  step: 1
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleMouseDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (direction, event) {
      var _this3$props = _this3.props,
          min = _this3$props.min,
          max = _this3$props.max;
      event && event.persist();
      var method = direction === 'UP' ? _this3.increment : _this3.decrement;
      var value = method.call(_this3, event),
          atTop = direction === 'UP' && value === max,
          atBottom = direction === 'DOWN' && value === min;
      if (atTop || atBottom) _this3.handleMouseUp();else if (!_this3._cancelRepeater) {
        _this3._cancelRepeater = createInterval(function () {
          _this3.handleMouseDown(direction, event);
        });
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleMouseUp", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4._cancelRepeater && _this4._cancelRepeater();
      _this4._cancelRepeater = null;
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (event) {
      var _this5$props = _this5.props,
          min = _this5$props.min,
          max = _this5$props.max,
          onKeyDown = _this5$props.onKeyDown;
      var key = event.key;
      (0, _widgetHelpers.notify)(onKeyDown, [event]);
      if (event.defaultPrevented) return;
      if (key === 'End' && isFinite(max)) _this5.handleChange(max, event);else if (key === 'Home' && isFinite(min)) _this5.handleChange(min, event);else if (key === 'ArrowDown') {
        event.preventDefault();

        _this5.decrement(event);
      } else if (key === 'ArrowUp') {
        event.preventDefault();

        _this5.increment(event);
      }
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(NumberPicker, {
  value: 'onChange'
}, ['focus']); // thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036


exports.default = _default;

function round(value, precision) {
  precision = precision || 0;
  value = ('' + value).split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)));
  value = ('' + value).split('e');
  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision));
  return value.toFixed(precision);
}

module.exports = exports["default"];