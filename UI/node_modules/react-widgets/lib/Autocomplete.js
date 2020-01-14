"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _List = _interopRequireDefault(require("./List"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _Input = _interopRequireDefault(require("./Input"));

var _Select = _interopRequireDefault(require("./Select"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _messages = require("./messages");

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _reduceToListState = _interopRequireDefault(require("./util/reduceToListState"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _getAccessors = _interopRequireDefault(require("./util/getAccessors"));

var _scrollManager = _interopRequireDefault(require("./util/scrollManager"));

var Props = _interopRequireWildcard(require("./util/Props"));

var _interaction = require("./util/interaction");

var _widgetHelpers = require("./util/widgetHelpers");

var _AutocompleteListItem = _interopRequireDefault(require("./AutocompleteListItem"));

var _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var propTypes = {
  //-- controlled props -----------
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  //------------------------------------
  openWithoutData: PropTypes.bool,
  itemComponent: CustomPropTypes.elementType,
  selectComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  data: PropTypes.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  onKeyDown: PropTypes.func,
  onSelect: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  busy: PropTypes.bool,
  delay: PropTypes.number,
  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,
  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message
  })
};

var Autocomplete = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Autocomplete, _React$Component);

  function Autocomplete(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initializerDefineProperty(_this, "handleSelect", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleInputChange = function (event) {
      _this.change(event.target.value, event);

      _this.open();
    };

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachListRef = function (ref) {
      _this.listRef = ref;
    };

    _this.attachInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.canOpen = function () {
      return !!_this.props.value && (_this.props.openWithoutData || !!_this.props.data.length);
    };

    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: _this.handleFocusChanged
    });
    _this.state = {
      open: false
    };
    return _this;
  }

  Autocomplete.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        messages = nextProps.messages;
    var _prevState$focusedIte = prevState.focusedItem,
        focusedItem = _prevState$focusedIte === void 0 ? null : _prevState$focusedIte;
    var accessors = (0, _getAccessors.default)(nextProps);
    var index = accessors.indexOf(data, value);
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      accessors: accessors,
      nextProps: nextProps
    });
    return {
      data: data,
      list: list,
      accessors: accessors,
      messages: (0, _messages.getMessages)(messages),
      selectedItem: list.nextEnabled(data[index]),
      focusedItem: ~index ? list.nextEnabled(data[index]) : focusedItem
    };
  };

  var _proto = Autocomplete.prototype;

  _proto.renderList = function renderList(messages) {
    var activeId = this.activeId,
        inputId = this.inputId,
        listId = this.listId;
    var _this$props = this.props,
        open = _this$props.open,
        value = _this$props.value;
    var _this$state = this.state,
        selectedItem = _this$state.selectedItem,
        focusedItem = _this$state.focusedItem,
        accessors = _this$state.accessors,
        list = _this$state.list;
    var List = this.props.listComponent;
    return _react.default.createElement(List, _extends({}, list.props, {
      id: listId,
      activeId: activeId,
      ref: this.attachListRef,
      selectedItem: selectedItem,
      searchTerm: accessors.text(value) || '',
      focusedItem: open ? focusedItem : null,
      "aria-hidden": !open,
      "aria-labelledby": inputId,
      "aria-live": open && 'polite',
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      messages: messages
    }));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        className = _this$props2.className,
        popupTransition = _this$props2.popupTransition,
        data = _this$props2.data,
        value = _this$props2.value,
        busy = _this$props2.busy,
        dropUp = _this$props2.dropUp,
        open = _this$props2.open,
        autoFocus = _this$props2.autoFocus,
        placeholder = _this$props2.placeholder,
        inputProps = _this$props2.inputProps,
        SelectComponent = _this$props2.selectComponent;
    var _this$state2 = this.state,
        focused = _this$state2.focused,
        accessors = _this$state2.accessors,
        messages = _this$state2.messages;
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    var elementProps = Props.pickElementProps(this);
    var shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this);
    var valueItem = accessors.findOrSelf(data, value);
    var actuallyOpen = open && this.canOpen();
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      open: actuallyOpen,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      className: (0, _classnames.default)(className, 'rw-autocomplete')
    }), _react.default.createElement(_WidgetPicker.default, null, _react.default.createElement(_Input.default, _extends({}, inputProps, {
      role: "combobox",
      id: this.inputId,
      autoFocus: autoFocus,
      nodeRef: this.attachInputRef,
      disabled: disabled === true,
      readOnly: readOnly === true,
      "aria-busy": !!busy,
      "aria-owns": this.listId,
      "aria-autocomplete": "list",
      "aria-activedescendant": open ? this.activeId : null,
      "aria-expanded": open,
      "aria-haspopup": true,
      placeholder: placeholder,
      value: accessors.text(valueItem),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown
    })), _react.default.createElement(SelectComponent, {
      busy: busy,
      "aria-hidden": "true",
      role: "presentational",
      disabled: disabled || readOnly
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      open: actuallyOpen,
      transition: popupTransition,
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      }
    }, _react.default.createElement("div", null, this.renderList(messages))));
  };

  _proto.focus = function focus() {
    this.inputRef && this.inputRef.focus();
  };

  _proto.change = function change(nextValue, originalEvent) {
    var _this$props3 = this.props,
        onChange = _this$props3.onChange,
        lastValue = _this$props3.value;
    (0, _widgetHelpers.notify)(onChange, [nextValue, {
      lastValue: lastValue,
      originalEvent: originalEvent
    }]);
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    var _this3 = this;

    this.setState({
      focusedItem: null
    }, function () {
      (0, _widgetHelpers.notify)(_this3.props.onToggle, false);
    });
  };

  return Autocomplete;
}(_react.default.Component), _class3.defaultProps = {
  data: [],
  open: false,
  openWithoutData: false,
  listComponent: _List.default,
  selectComponent: _Select.default,
  itemComponent: _AutocompleteListItem.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (data, originalEvent) {
      _this4.close();

      (0, _widgetHelpers.notify)(_this4.props.onSelect, [data, {
        originalEvent: originalEvent
      }]);

      _this4.change(data, originalEvent);

      _this4.focus();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      var key = e.key;
      var _this5$state = _this5.state,
          list = _this5$state.list,
          focusedItem = _this5$state.focusedItem;
      var isOpen = _this5.props.open;
      (0, _widgetHelpers.notify)(_this5.props.onKeyDown, [e]);
      if (e.defaultPrevented) return;

      if (!isOpen) {
        if (key === 'ArrowDown') _this5.open();
        return;
      }

      if (key === 'End') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.last()
        });
      } else if (key === 'Home') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.first()
        });
      } else if (key === 'Escape') _this5.close();else if (key === 'Enter') {
        if (!focusedItem) {
          return void _this5.close();
        }

        e.preventDefault();

        _this5.handleSelect(focusedItem, e);

        _this5.change(focusedItem, false, e);
      } else if (key === 'ArrowDown') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.next(focusedItem)
        });
      } else if (key === 'ArrowUp') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.prev(focusedItem)
        });
      }
    };
  }
})), _class2)) || _class;

Autocomplete.propTypes = propTypes;

var _default = (0, _uncontrollable.default)(Autocomplete, {
  open: 'onToggle',
  value: 'onChange'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];