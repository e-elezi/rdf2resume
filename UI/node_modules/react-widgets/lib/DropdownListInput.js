"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _dataHelpers = require("./util/dataHelpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DropdownListInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownListInput, _React$Component);

  function DropdownListInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      autofilling: false
    };

    _this.handleAutofillDetect = function (_ref) {
      var animationName = _ref.animationName;
      var autofilling;
      if (animationName === 'react-widgets-autofill-start') autofilling = true;else if (animationName === 'react-widgets-autofill-cancel') autofilling = false;else return;

      _this.setState({
        autofilling: autofilling
      });

      _this.props.onAutofill(autofilling);
    };

    _this.handleAutofill = function (e) {
      _this.setState({
        autofilling: false
      });

      _this.props.onAutofillChange(e);
    };

    return _this;
  }

  var _proto = DropdownListInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        name = _this$props.name,
        placeholder = _this$props.placeholder,
        value = _this$props.value,
        textField = _this$props.textField,
        autoComplete = _this$props.autoComplete,
        Component = _this$props.valueComponent;
    var autofilling = this.state.autofilling;
    var child = null;

    if (!autofilling && autoComplete !== 'off') {
      child = !value && placeholder ? _react.default.createElement("span", {
        className: "rw-placeholder"
      }, placeholder) : Component ? _react.default.createElement(Component, {
        item: value
      }) : (0, _dataHelpers.dataText)(value, textField);
    }

    var val = (0, _dataHelpers.dataValue)(value, textField);
    return _react.default.createElement("div", {
      className: "rw-input rw-dropdown-list-input"
    }, autoComplete !== 'off' && _react.default.createElement("input", {
      tabIndex: "-1",
      name: name,
      value: val == null ? '' : val,
      autoComplete: autoComplete,
      onChange: this.handleAutofill,
      onAnimationStart: this.handleAutofillDetect,
      className: (0, _classnames.default)('rw-dropdown-list-autofill rw-detect-autofill', !autofilling && 'rw-sr')
    }), child);
  };

  return DropdownListInput;
}(_react.default.Component);

DropdownListInput.propTypes = {
  value: _propTypes.default.any,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  autoComplete: _propTypes.default.string,
  textField: CustomPropTypes.accessor,
  valueComponent: CustomPropTypes.elementType,
  onAutofill: _propTypes.default.func.isRequired,
  onAutofillChange: _propTypes.default.func.isRequired
};
var _default = DropdownListInput;
exports.default = _default;
module.exports = exports["default"];