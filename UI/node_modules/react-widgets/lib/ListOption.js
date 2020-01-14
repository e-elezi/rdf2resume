"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var Props = _interopRequireWildcard(require("./util/Props"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ListOption =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListOption, _React$Component);

  function ListOption() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleSelect = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;
      if (onSelect && !disabled) onSelect(dataItem, event);
    };

    return _this;
  }

  var _proto = ListOption.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children,
        focused = _this$props2.focused,
        selected = _this$props2.selected,
        disabled = _this$props2.disabled,
        activeId = _this$props2.activeId;
    var Tag = this.props.component || 'li';
    var props = Props.omitOwn(this);
    var classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled
    };
    var id = focused ? activeId : undefined;
    return _react.default.createElement(Tag, _extends({
      id: id,
      role: "option",
      tabIndex: !disabled ? '-1' : undefined,
      "aria-selected": !!selected,
      className: (0, _classnames.default)('rw-list-option', className, classes),
      onClick: this.handleSelect
    }, props), children);
  };

  return ListOption;
}(_react.default.Component);

ListOption.propTypes = {
  activeId: _propTypes.default.string,
  dataItem: _propTypes.default.any,
  index: _propTypes.default.number,
  focused: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  component: _propTypes.default.string
};
var _default = ListOption;
exports.default = _default;
module.exports = exports["default"];