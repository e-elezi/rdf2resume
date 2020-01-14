"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MultiselectTag = _interopRequireDefault(require("./MultiselectTag"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _dataHelpers = require("./util/dataHelpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// disabled === true || [1, 2, 3, etc]
var isDisabled = function isDisabled(item, list, value) {
  return !!(Array.isArray(list) ? ~(0, _dataHelpers.dataIndexOf)(list, item, value) : list);
};

var MultiselectTagList =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectTagList, _React$Component);

  function MultiselectTagList() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MultiselectTagList.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        value = _this$props.value,
        activeId = _this$props.activeId,
        valueAccessor = _this$props.valueAccessor,
        textAccessor = _this$props.textAccessor,
        label = _this$props.label,
        disabled = _this$props.disabled,
        onDelete = _this$props.onDelete,
        focusedItem = _this$props.focusedItem,
        ValueComponent = _this$props.valueComponent;
    return _react.default.createElement("ul", {
      id: id,
      role: "listbox",
      "aria-label": label,
      className: "rw-multiselect-taglist"
    }, value.map(function (item, i) {
      var isFocused = focusedItem === item;
      return _react.default.createElement(_MultiselectTag.default, {
        key: i,
        id: isFocused ? activeId : null,
        value: item,
        focused: isFocused,
        onClick: onDelete,
        disabled: isDisabled(item, disabled, valueAccessor)
      }, ValueComponent ? _react.default.createElement(ValueComponent, {
        item: item
      }) : _react.default.createElement("span", null, textAccessor(item)));
    }));
  };

  return MultiselectTagList;
}(_react.default.Component);

MultiselectTagList.propTypes = {
  id: _propTypes.default.string.isRequired,
  activeId: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  value: _propTypes.default.array,
  focusedItem: _propTypes.default.any,
  valueAccessor: _propTypes.default.func.isRequired,
  textAccessor: _propTypes.default.func.isRequired,
  onDelete: _propTypes.default.func.isRequired,
  valueComponent: _propTypes.default.func,
  disabled: CustomPropTypes.disabled.acceptsArray
};
var _default = MultiselectTagList;
exports.default = _default;
module.exports = exports["default"];