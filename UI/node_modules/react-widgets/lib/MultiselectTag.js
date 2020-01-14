"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _interaction = require("./util/interaction");

var _Button = _interopRequireDefault(require("./Button"));

var _class, _descriptor, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var MultiselectTag = (_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectTag, _React$Component);

  function MultiselectTag() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "onClick", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  var _proto = MultiselectTag.prototype;

  _proto.renderDelete = function renderDelete() {
    var _this$props = this.props,
        label = _this$props.label,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly;
    return _react.default.createElement(_Button.default, {
      variant: "select",
      onClick: this.onClick,
      className: "rw-multiselect-tag-btn",
      disabled: disabled || readOnly,
      "aria-label": label || 'Remove item'
    }, _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        children = _this$props2.children,
        focused = _this$props2.focused,
        disabled = _this$props2.disabled;
    return _react.default.createElement("li", {
      id: id,
      role: "option",
      className: (0, _classnames.default)('rw-multiselect-tag', disabled && 'rw-state-disabled', focused && !disabled && 'rw-state-focus')
    }, children, _react.default.createElement("div", null, this.renderDelete()));
  };

  return MultiselectTag;
}(_react.default.Component), _class2.propTypes = {
  id: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  label: _propTypes.default.string,
  value: _propTypes.default.any
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "onClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (event) {
      var _this2$props = _this2.props,
          value = _this2$props.value,
          disabled = _this2$props.disabled,
          onClick = _this2$props.onClick;
      if (!disabled) onClick(value, event);
    };
  }
})), _class);
var _default = MultiselectTag;
exports.default = _default;
module.exports = exports["default"];