"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _closest = _interopRequireDefault(require("dom-helpers/query/closest"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _Select = _interopRequireDefault(require("./Select"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _MultiselectInput = _interopRequireDefault(require("./MultiselectInput"));

var _MultiselectTagList = _interopRequireDefault(require("./MultiselectTagList"));

var _List = _interopRequireDefault(require("./List"));

var _AddToListOption = _interopRequireDefault(require("./AddToListOption"));

var _ = require("./util/_");

var Filter = _interopRequireWildcard(require("./util/Filter"));

var Props = _interopRequireWildcard(require("./util/Props"));

var _messages = require("./messages");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _reduceToListState = _interopRequireWildcard(require("./util/reduceToListState"));

var _getAccessors = _interopRequireDefault(require("./util/getAccessors"));

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _scrollManager = _interopRequireDefault(require("./util/scrollManager"));

var _interaction = require("./util/interaction");

var _widgetHelpers = require("./util/widgetHelpers");

var _Icon = require("./Icon");

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CREATE_OPTION = {};
var ENTER = 13;
var INSERT = 'insert';
var REMOVE = 'remove';

var propTypes = _extends({}, Filter.propTypes, {
  data: _propTypes.default.array,
  //-- controlled props --
  value: _propTypes.default.array,

  /**
   * @type {function (
   *  dataItems: ?any[],
   *  metadata: {
   *    dataItem: any,
   *    action: 'insert' | 'remove',
   *    originalEvent: SyntheticEvent,
   *    lastValue: ?any[],
   *    searchTerm: ?string
   *  }
   * ): void}
   */
  onChange: _propTypes.default.func,
  searchTerm: _propTypes.default.string,

  /**
   * @type {function (
   *  searchTerm: ?string,
   *  metadata: {
   *    action: 'clear' | 'input',
   *    lastSearchTerm: ?string,
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onSearch: _propTypes.default.func,
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  //-------------------------------------------
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  tagComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  allowCreate: _propTypes.default.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: _propTypes.default.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: _propTypes.default.func,
  busy: _propTypes.default.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: _propTypes.default.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: _propTypes.default.node,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  autoFocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,

  /** Continue to show the input placeholder even if tags are selected */
  showPlaceholderWithValues: _propTypes.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message,
    tagsLabel: CustomPropTypes.message,
    selectedItems: CustomPropTypes.message,
    noneSelected: CustomPropTypes.message,
    removeLabel: CustomPropTypes.message
  })
  /**
   * ---
   * shortcuts:
   *   - { key: left arrow, label: move focus to previous tag }
   *   - { key: right arrow, label: move focus to next tag }
   *   - { key: delete, deselect focused tag }
   *   - { key: backspace, deselect next tag }
   *   - { key: alt + up arrow, label: close Multiselect }
   *   - { key: down arrow, label: open Multiselect, and move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: ctrl + enter, label: create new tag from current searchTerm }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * A select listbox alternative.
   *
   * @public
   */

});

var Multiselect = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Multiselect, _React$Component);

  function Multiselect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleFocusDidChange = function (focused) {
      if (focused) return _this.focus();

      _this.close();

      _this.clearSearch();

      if (_this.tagsRef) _this.setState({
        focusedTag: null
      });
    };

    _this.handleDelete = function (dataItem, event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly;
      if (disabled == true || readOnly) return;

      _this.focus();

      _this.change(dataItem, event, REMOVE);
    };

    _this.handleSearchKeyDown = function (e) {
      if (e.key === 'Backspace' && e.target.value && !_this._deletingText) _this._deletingText = true;
    };

    _this.handleSearchKeyUp = function (e) {
      if (e.key === 'Backspace' && _this._deletingText) _this._deletingText = false;
    };

    _this.handleInputChange = function (e) {
      _this.search(e.target.value, e, 'input');

      _this.open();
    };

    _initializerDefineProperty(_this, "handleClick", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleDoubleClick", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleSelect", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleCreate", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachListRef = function (ref) {
      return _this.listRef = ref;
    };

    _this.attachTagsRef = function (ref) {
      return _this.tagsRef = ref;
    };

    _this.attachInputRef = function (ref) {
      return _this.inputRef = ref;
    };

    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.tagsId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_taglist');
    _this.notifyId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_notify_area');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.createId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_createlist_option');
    _this.activeTagId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_taglist_active_tag');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: _this.handleFocusDidChange
    });
    _this.state = {
      focusedTag: null
    };
    return _this;
  }

  Multiselect.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        searchTerm = nextProps.searchTerm,
        messages = nextProps.messages,
        minLength = nextProps.minLength,
        caseSensitive = nextProps.caseSensitive,
        filter = nextProps.filter;
    var focusedItem = prevState.focusedItem,
        focusedTag = prevState.focusedTag;
    var accessors = (0, _getAccessors.default)(nextProps);
    var valueChanged = nextProps.value !== prevState.lastValue;
    var values = (0, _.makeArray)(nextProps.value);
    var dataItems = valueChanged ? values.map(function (item) {
      return accessors.findOrSelf(data, item);
    }) : prevState.dataItems;
    data = data.filter(function (i) {
      return !values.some(function (v) {
        return accessors.matches(i, v);
      });
    });
    var lengthWithoutValues = data.length;
    data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: accessors.text
    });
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    var tagList = (0, _reduceToListState.default)(dataItems, prevState.tagList, {
      nextProps: nextProps,
      getDataState: _reduceToListState.defaultGetDataState
    });
    var nextFocusedItem = ~data.indexOf(focusedItem) ? focusedItem : data[0];
    return {
      data: data,
      dataItems: dataItems,
      list: list,
      tagList: tagList,
      accessors: accessors,
      lengthWithoutValues: lengthWithoutValues,
      lastValue: nextProps.value,
      messages: (0, _messages.getMessages)(messages),
      focusedTag: valueChanged ? list.nextEnabled(~dataItems.indexOf(focusedTag) ? focusedTag : null) : focusedTag,
      focusedItem: valueChanged || prevState.focusedItem === undefined ? list.nextEnabled(nextFocusedItem) : nextFocusedItem
    };
  };

  var _proto = Multiselect.prototype;

  _proto.renderInput = function renderInput(ownedIds) {
    var _this$props2 = this.props,
        searchTerm = _this$props2.searchTerm,
        maxLength = _this$props2.maxLength,
        tabIndex = _this$props2.tabIndex,
        busy = _this$props2.busy,
        autoFocus = _this$props2.autoFocus,
        inputProps = _this$props2.inputProps,
        open = _this$props2.open;
    var _this$state = this.state,
        focusedItem = _this$state.focusedItem,
        focusedTag = _this$state.focusedTag;
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    var active;
    if (!open) active = focusedTag ? this.activeTagId : '';else if (focusedItem || this.allowCreate()) active = this.activeOptionId;
    return _react.default.createElement(_MultiselectInput.default, _extends({}, inputProps, {
      autoFocus: autoFocus,
      tabIndex: tabIndex || 0,
      role: "listbox",
      "aria-expanded": !!open,
      "aria-busy": !!busy,
      "aria-owns": ownedIds,
      "aria-haspopup": true,
      "aria-activedescendant": active || null,
      value: searchTerm,
      maxLength: maxLength,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: this.getPlaceholder(),
      onKeyDown: this.handleSearchKeyDown,
      onKeyUp: this.handleSearchKeyUp,
      onChange: this.handleInputChange,
      ref: this.attachInputRef
    }));
  };

  _proto.renderList = function renderList() {
    var inputId = this.inputId,
        activeOptionId = this.activeOptionId,
        listId = this.listId;
    var _this$props3 = this.props,
        open = _this$props3.open,
        searchTerm = _this$props3.searchTerm,
        optionComponent = _this$props3.optionComponent,
        itemComponent = _this$props3.itemComponent,
        groupComponent = _this$props3.groupComponent,
        listProps = _this$props3.listProps;
    var _this$state2 = this.state,
        focusedItem = _this$state2.focusedItem,
        list = _this$state2.list,
        lengthWithoutValues = _this$state2.lengthWithoutValues,
        accessors = _this$state2.accessors,
        data = _this$state2.data,
        messages = _this$state2.messages;
    var List = this.props.listComponent;
    return _react.default.createElement(List, _extends({}, listProps, {
      id: listId,
      activeId: activeOptionId,
      data: data,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      searchTerm: searchTerm,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      itemComponent: itemComponent,
      groupComponent: groupComponent,
      optionComponent: optionComponent,
      focusedItem: focusedItem,
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      "aria-live": "polite",
      "aria-labelledby": inputId,
      "aria-hidden": !open,
      ref: this.attachListRef,
      messages: {
        emptyList: lengthWithoutValues ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  _proto.renderNotificationArea = function renderNotificationArea() {
    var _this$state3 = this.state,
        focused = _this$state3.focused,
        dataItems = _this$state3.dataItems,
        accessors = _this$state3.accessors,
        messages = _this$state3.messages;
    var itemLabels = dataItems.map(function (item) {
      return accessors.text(item);
    });
    return _react.default.createElement("span", {
      id: this.notifyId,
      role: "status",
      className: "rw-sr",
      "aria-live": "assertive",
      "aria-atomic": "true",
      "aria-relevant": "additions removals text"
    }, focused && (dataItems.length ? messages.selectedItems(itemLabels) : messages.noneSelected()));
  };

  _proto.renderTags = function renderTags() {
    var _this$props4 = this.props,
        readOnly = _this$props4.readOnly,
        disabled = _this$props4.disabled;
    var _this$state4 = this.state,
        focusedTag = _this$state4.focusedTag,
        dataItems = _this$state4.dataItems,
        accessors = _this$state4.accessors,
        messages = _this$state4.messages;
    var Component = this.props.tagComponent;
    return _react.default.createElement(_MultiselectTagList.default, {
      id: this.tagsId,
      activeId: this.activeTagId,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      label: messages.tagsLabel(),
      value: dataItems,
      readOnly: readOnly,
      disabled: disabled,
      focusedItem: focusedTag,
      onDelete: this.handleDelete,
      valueComponent: Component,
      ref: this.attachTagsRef
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        className = _this$props5.className,
        busy = _this$props5.busy,
        dropUp = _this$props5.dropUp,
        open = _this$props5.open,
        searchTerm = _this$props5.searchTerm,
        selectIcon = _this$props5.selectIcon,
        busySpinner = _this$props5.busySpinner,
        containerClassName = _this$props5.containerClassName,
        popupTransition = _this$props5.popupTransition;
    var _this$state5 = this.state,
        focused = _this$state5.focused,
        focusedItem = _this$state5.focusedItem,
        dataItems = _this$state5.dataItems,
        messages = _this$state5.messages;
    var elementProps = Props.pickElementProps(this);
    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this),
        allowCreate = this.allowCreate();
    var inputOwns = this.listId + " " + this.notifyId + " " + (shouldRenderTags ? this.tagsId : '') + (allowCreate ? this.createId : '');
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: open,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onKeyDown: this.handleKeyDown,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-multiselect')
    }), this.renderNotificationArea(messages), _react.default.createElement(_WidgetPicker.default, {
      onClick: this.handleClick,
      onTouchEnd: this.handleClick,
      onDoubleClick: this.handleDoubleClick,
      className: (0, _classnames.default)(containerClassName, 'rw-widget-input')
    }, _react.default.createElement("div", null, shouldRenderTags && this.renderTags(messages), this.renderInput(inputOwns)), _react.default.createElement(_Select.default, {
      busy: busy,
      spinner: busySpinner,
      icon: focused ? selectIcon : null,
      "aria-hidden": "true",
      role: "presentational",
      disabled: disabled || readOnly
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      open: open,
      transition: popupTransition,
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      }
    }, _react.default.createElement("div", null, this.renderList(), allowCreate && _react.default.createElement(_AddToListOption.default, {
      id: this.createId,
      searchTerm: searchTerm,
      onSelect: this.handleCreate,
      focused: !focusedItem || focusedItem === CREATE_OPTION
    }, messages.createOption(this.props)))));
  };

  _proto.change = function change(dataItem, originalEvent, action) {
    var _this$props6 = this.props,
        onChange = _this$props6.onChange,
        searchTerm = _this$props6.searchTerm,
        lastValue = _this$props6.value;
    var dataItems = this.state.dataItems;

    switch (action) {
      case INSERT:
        dataItems = dataItems.concat(dataItem);
        break;

      case REMOVE:
        dataItems = dataItems.filter(function (d) {
          return d !== dataItem;
        });
        break;
    }

    (0, _widgetHelpers.notify)(onChange, [dataItems, {
      action: action,
      dataItem: dataItem,
      originalEvent: originalEvent,
      lastValue: lastValue,
      searchTerm: searchTerm
    }]);
    this.clearSearch(originalEvent);
  };

  _proto.clearSearch = function clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear');
  };

  _proto.search = function search(searchTerm, originalEvent, action) {
    if (action === void 0) {
      action = 'input';
    }

    var _this$props7 = this.props,
        onSearch = _this$props7.onSearch,
        lastSearchTerm = _this$props7.searchTerm;
    if (searchTerm !== lastSearchTerm) (0, _widgetHelpers.notify)(onSearch, [searchTerm, {
      action: action,
      lastSearchTerm: lastSearchTerm,
      originalEvent: originalEvent
    }]);
  };

  _proto.focus = function focus() {
    if (this.inputRef) this.inputRef.focus();
  };

  _proto.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.allowCreate = function allowCreate() {
    var _this$props8 = this.props,
        searchTerm = _this$props8.searchTerm,
        onCreate = _this$props8.onCreate,
        allowCreate = _this$props8.allowCreate;
    return !!(onCreate && (allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !this.hasExtactMatch());
  };

  _proto.hasExtactMatch = function hasExtactMatch() {
    var _this$props9 = this.props,
        searchTerm = _this$props9.searchTerm,
        caseSensitive = _this$props9.caseSensitive;
    var _this$state6 = this.state,
        data = _this$state6.data,
        dataItems = _this$state6.dataItems,
        accessors = _this$state6.accessors;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    };

    var eq = function eq(v) {
      return lower(accessors.text(v)) === lower(searchTerm);
    }; // if there is an exact match on textFields:
    // "john" => { name: "john" }, don't show


    return dataItems.some(eq) || data.some(eq);
  };

  _proto.getPlaceholder = function getPlaceholder() {
    var _this$props10 = this.props,
        value = _this$props10.value,
        placeholder = _this$props10.placeholder,
        showPlaceholderWithValues = _this$props10.showPlaceholderWithValues;
    return (value && value.length && !showPlaceholderWithValues ? '' : placeholder) || '';
  };

  return Multiselect;
}(_react.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  allowCreate: 'onFilter',
  filter: 'startsWith',
  value: [],
  searchTerm: '',
  selectIcon: _Icon.caretDown,
  listComponent: _List.default,
  showPlaceholderWithValues: false
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (_ref) {
      var target = _ref.target;

      _this3.focus();

      if ((0, _closest.default)(target, '.rw-select')) _this3.toggle();else _this3.open();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleDoubleClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      if (!_this4.inputRef) return;

      _this4.focus();

      _this4.inputRef.select();
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (dataItem, originalEvent) {
      if (dataItem === undefined || dataItem === CREATE_OPTION) {
        _this5.handleCreate(_this5.props.searchTerm, originalEvent);

        return;
      }

      (0, _widgetHelpers.notify)(_this5.props.onSelect, [dataItem, {
        originalEvent: originalEvent
      }]);

      _this5.change(dataItem, originalEvent, INSERT);

      _this5.focus();
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleCreate", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (searchTerm, event) {
      if (searchTerm === void 0) {
        searchTerm = '';
      }

      (0, _widgetHelpers.notify)(_this6.props.onCreate, searchTerm);

      _this6.clearSearch(event);

      _this6.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (event) {
      var _this7$props = _this7.props,
          open = _this7$props.open,
          searchTerm = _this7$props.searchTerm,
          onKeyDown = _this7$props.onKeyDown;
      var key = event.key,
          keyCode = event.keyCode,
          altKey = event.altKey,
          ctrlKey = event.ctrlKey;
      var _this7$state = _this7.state,
          focusedTag = _this7$state.focusedTag,
          focusedItem = _this7$state.focusedItem,
          list = _this7$state.list,
          tagList = _this7$state.tagList;
      var createIsFocused = focusedItem === CREATE_OPTION;

      var canCreate = _this7.allowCreate();

      var focusTag = function focusTag(tag) {
        return _this7.setState({
          focusedTag: tag
        });
      };

      var focusItem = function focusItem(item) {
        return _this7.setState({
          focusedItem: item,
          focusedTag: null
        });
      };

      (0, _widgetHelpers.notify)(onKeyDown, [event]);
      if (event.defaultPrevented) return;

      if (key === 'ArrowDown') {
        event.preventDefault();
        if (!open) return _this7.open();
        var next = list.next(focusedItem);
        var creating = createIsFocused || canCreate && focusedItem === next;
        focusItem(creating ? CREATE_OPTION : next);
      } else if (key === 'ArrowUp' && (open || altKey)) {
        event.preventDefault();
        if (altKey) return _this7.close();
        focusItem(createIsFocused ? list.last() : list.prev(focusedItem));
      } else if (key === 'End') {
        event.preventDefault();
        if (open) focusItem(list.last());else focusTag(tagList.last());
      } else if (key === 'Home') {
        event.preventDefault();
        if (open) focusItem(list.first());else focusTag(tagList.first());
      } else if (open && keyCode === ENTER) {
        // using keyCode to ignore enter for japanese IME
        event.preventDefault();
        if (ctrlKey && canCreate) return _this7.handleCreate(searchTerm, event);

        _this7.handleSelect(focusedItem, event);
      } else if (key === 'Escape') {
        open ? _this7.close() : tagList && focusTag(null);
      } else if (!searchTerm && !_this7._deletingText) {
        if (key === 'ArrowLeft') {
          focusTag(tagList.prev(focusedTag) || tagList.last());
        } else if (key === 'ArrowRight' && focusedTag) {
          var nextTag = tagList.next(focusedTag);
          focusTag(nextTag === focusedTag ? null : nextTag);
        } else if (key === 'Delete' && !tagList.isDisabled(focusedTag)) {
          _this7.handleDelete(focusedTag, event);
        } else if (key === 'Backspace') {
          _this7.handleDelete(tagList.last(), event);
        } else if (key === ' ' && !open) {
          event.preventDefault();

          _this7.open();
        }
      }
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(Multiselect, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];