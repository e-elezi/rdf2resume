"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactComponentManagers = require("react-component-managers");

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _List = _interopRequireDefault(require("./List"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _SelectListItem = _interopRequireDefault(require("./SelectListItem"));

var _messages = require("./messages");

var _ = require("./util/_");

var Props = _interopRequireWildcard(require("./util/Props"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _reduceToListState = _interopRequireDefault(require("./util/reduceToListState"));

var _getAccessors = _interopRequireDefault(require("./util/getAccessors"));

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _scrollManager = _interopRequireDefault(require("./util/scrollManager"));

var _interaction = require("./util/interaction");

var _widgetHelpers = require("./util/widgetHelpers");

var _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var BusyMask = function BusyMask() {
  return _react.default.createElement("span", {
    className: "rw-loading-mask"
  });
};

function getFirstValue(data, values) {
  if (!values.length) return null;

  for (var idx = 0; idx < data.length; idx++) {
    if (~values.indexOf(data[idx])) return data[idx];
  }

  return null;
}
/**
 * ---
 * shortcuts:
 *   - { key: down arrow, label: move focus, or select previous option }
 *   - { key: up arrow, label: move focus, or select next option }
 *   - { key: home, label: move focus to first option }
 *   - { key: end, label: move focus to last option }
 *   - { key: spacebar, label: toggle focused option }
 *   - { key: ctrl + a, label: ctoggle select all/select none }
 *   - { key: any key, label: search list for option starting with key }
 * ---
 *
 * A group of radio buttons or checkboxes bound to a dataset.
 *
 * @public
 */


var SelectList = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectList, _React$Component);

  function SelectList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleMouseDown = function () {
      _this._clicking = true;
    };

    _this.handleFocusChanged = function (focused) {
      var _this$props = _this.props,
          data = _this$props.data,
          disabled = _this$props.disabled;
      var _this$state = _this.state,
          dataItems = _this$state.dataItems,
          accessors = _this$state.accessors,
          list = _this$state.list; // the rigamarole here is to avoid flicker went clicking an item and
      // gaining focus at the same time.

      if (focused !== _this.state.focused) {
        if (!focused) _this.setState({
          focusedItem: null
        });else if (focused && !_this._clicking) {
          var allowed = Array.isArray(disabled) ? dataItems.filter(function (v) {
            return !accessors.includes(disabled, v);
          }) : dataItems;

          _this.setState({
            focusedItem: getFirstValue(data, allowed) || list.nextEnabled(data[0])
          });
        }
        _this._clicking = false;
      }
    };

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyPress", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleChange = function (item, checked, originalEvent) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          onChange = _this$props2.onChange;
      var lastValue = _this.state.dataItems;

      _this.setState({
        focusedItem: item
      });

      if (!multiple) return (0, _widgetHelpers.notify)(onChange, [checked ? item : null, {
        originalEvent: originalEvent,
        lastValue: lastValue,
        checked: checked
      }]);
      var nextValue = checked ? lastValue.concat(item) : lastValue.filter(function (v) {
        return v !== item;
      });
      (0, _widgetHelpers.notify)(onChange, [nextValue || [], {
        checked: checked,
        lastValue: lastValue,
        originalEvent: originalEvent,
        dataItem: item
      }]);
    };

    _this.attachListRef = function (ref) {
      return _this.listRef = ref;
    };

    _this.renderListItem = function (itemProps) {
      var _this$props3 = _this.props,
          name = _this$props3.name,
          multiple = _this$props3.multiple,
          disabled = _this$props3.disabled,
          readOnly = _this$props3.readOnly;
      var _this$state2 = _this.state,
          dataItems = _this$state2.dataItems,
          accessors = _this$state2.accessors;
      return _react.default.createElement(_SelectListItem.default, _extends({}, itemProps, {
        name: name || _this.itemName,
        type: multiple ? 'checkbox' : 'radio',
        readOnly: disabled === true || readOnly,
        onChange: _this.handleChange,
        onMouseDown: _this.handleMouseDown,
        checked: accessors.includes(dataItems, itemProps.dataItem)
      }));
    };

    (0, _reactComponentManagers.autoFocus)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.widgetId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_widget');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.itemName = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_name');
    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: _this.handleFocusChanged
    });
    _this.state = {};
    return _this;
  }

  SelectList.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        messages = nextProps.messages;
    var accessors = (0, _getAccessors.default)(nextProps);
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    return {
      list: list,
      accessors: accessors,
      messages: (0, _messages.getMessages)(messages),
      dataItems: (0, _.makeArray)(value).map(function (item) {
        return accessors.findOrSelf(data, item);
      })
    };
  };

  var _proto = SelectList.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        className = _this$props4.className,
        tabIndex = _this$props4.tabIndex,
        busy = _this$props4.busy,
        data = _this$props4.data,
        busySpinner = _this$props4.busySpinner,
        itemComponent = _this$props4.itemComponent,
        groupComponent = _this$props4.groupComponent,
        listProps = _this$props4.listProps;
    var elementProps = Props.pickElementProps(this);
    var _this$state3 = this.state,
        focusedItem = _this$state3.focusedItem,
        focused = _this$state3.focused,
        accessors = _this$state3.accessors,
        list = _this$state3.list,
        messages = _this$state3.messages;
    var List = this.props.listComponent;
    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true;
    focusedItem = focused && !disabled && !readOnly && focusedItem;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      id: this.widgetId,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      role: "radiogroup",
      "aria-busy": !!busy,
      "aria-activedescendant": this.activeId,
      className: (0, _classnames.default)(className, 'rw-select-list', 'rw-widget-input', 'rw-widget-container')
    }), _react.default.createElement(List, _extends({}, listProps, {
      role: "radiogroup",
      tabIndex: tabIndex || '0',
      id: this.listId,
      activeId: this.activeId,
      data: data,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      itemComponent: itemComponent,
      groupComponent: groupComponent,
      optionComponent: this.renderListItem,
      focusedItem: focusedItem,
      onMove: this.handleScroll,
      messages: {
        emptyList: messages.emptyList
      },
      ref: this.attachListRef
    })), busy && busySpinner);
  };

  _proto.focus = function focus() {
    (0, _reactDom.findDOMNode)(this.refs.list).focus();
  };

  _proto.selectAll = function selectAll() {
    var accessors = this.accessors;
    var _this$props5 = this.props,
        data = _this$props5.data,
        disabled = _this$props5.disabled,
        onChange = _this$props5.onChange;
    var values = this.state.dataItems;
    disabled = Array.isArray(disabled) ? disabled : [];
    var disabledValues;
    var enabledData = data;

    if (disabled.length) {
      disabledValues = values.filter(function (v) {
        return accessors.includes(disabled, v);
      });
      enabledData = data.filter(function (v) {
        return !accessors.includes(disabled, v);
      });
    }

    var nextValues = values.length >= enabledData.length ? values.filter(function (v) {
      return accessors.includes(disabled, v);
    }) : enabledData.concat(disabledValues);
    (0, _widgetHelpers.notify)(onChange, [nextValues]);
  };

  _proto.search = function search(character, originalEvent) {
    var _this2 = this;

    var _searchTerm = this._searchTerm,
        list = this.list;
    var word = ((_searchTerm || '') + character).toLowerCase();
    var multiple = this.props.multiple;
    if (!multiple) originalEvent.persist();
    if (!character) return;
    this._searchTerm = word;
    this.timeouts.set('search', function () {
      var focusedItem = list.next(_this2.state.focusedItem, word);
      _this2._searchTerm = '';

      if (focusedItem) {
        !multiple ? _this2.handleChange(focusedItem, true, originalEvent) : _this2.setState({
          focusedItem: focusedItem
        });
      }
    }, this.props.delay);
  };

  return SelectList;
}(_react.default.Component), _class3.propTypes = {
  data: _propTypes.default.array,
  value: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.array]),
  onChange: _propTypes.default.func,

  /**
   * A handler called when focus shifts on the SelectList. Internally this is used to ensure the focused item is in view.
   * If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
   * The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
   * the element that is currently focused, and a focused value.
   *
   * @type {function(list: HTMLELement, focusedNode: HTMLElement, focusedItem: any)}
   */
  onMove: _propTypes.default.func,

  /**
   * Whether or not the SelectList allows multiple selection or not. when `false` the SelectList will
   * render as a list of radio buttons, and checkboxes when `true`.
   */
  multiple: _propTypes.default.bool,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  itemComponent: CustomPropTypes.elementType,
  busySpinner: _propTypes.default.node,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  busy: _propTypes.default.bool,
  delay: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  listProps: _propTypes.default.object,
  tabIndex: _propTypes.default.any,

  /**
   * The HTML `name` attribute used to group checkboxes and radio buttons
   * together.
   */
  name: _propTypes.default.string,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    emptyList: CustomPropTypes.message
  })
}, _class3.defaultProps = {
  delay: 250,
  value: [],
  data: [],
  busySpinner: _react.default.createElement(BusyMask, null),
  listComponent: _List.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (event) {
      var multiple = _this3.props.multiple;
      var _this3$state = _this3.state,
          dataItems = _this3$state.dataItems,
          focusedItem = _this3$state.focusedItem,
          list = _this3$state.list,
          accessors = _this3$state.accessors;
      var keyCode = event.keyCode,
          key = event.key,
          ctrlKey = event.ctrlKey;

      var change = function change(item) {
        if (!item) return;
        var checked = multiple ? !accessors.includes(dataItems, item) // toggle value
        : true;

        _this3.handleChange(item, checked, event);
      };

      (0, _widgetHelpers.notify)(_this3.props.onKeyDown, [event]);
      if (event.defaultPrevented) return;

      if (key === 'End') {
        event.preventDefault();
        focusedItem = list.last();

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (key === 'Home') {
        event.preventDefault();
        focusedItem = list.first();

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        change(focusedItem);
      } else if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        focusedItem = list.next(focusedItem);

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        focusedItem = list.prev(focusedItem);

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (multiple && keyCode === 65 && ctrlKey) {
        event.preventDefault();

        _this3.selectAll();
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyPress", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (event) {
      (0, _widgetHelpers.notify)(_this4.props.onKeyPress, [event]);
      if (event.defaultPrevented) return;

      _this4.search(String.fromCharCode(event.which), event);
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(SelectList, {
  value: 'onChange'
}, ['selectAll', 'focus']);

exports.default = _default;
module.exports = exports["default"];