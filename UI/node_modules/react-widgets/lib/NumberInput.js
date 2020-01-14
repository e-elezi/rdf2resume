"use strict";

exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(require("dom-helpers/util/inDOM"));

var _activeElement = _interopRequireDefault(require("dom-helpers/activeElement"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Input = _interopRequireDefault(require("./Input"));

var Props = _interopRequireWildcard(require("./util/Props"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _localizers = require("./util/localizers");

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var getFormat = function getFormat(props) {
  return _localizers.number.getFormat('default', props.format);
};

var isSign = function isSign(val) {
  return (val || '').trim() === '-';
};

function isPaddedZeros(str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture);

  var _str$split = str.split(localeChar),
      _ = _str$split[0],
      decimals = _str$split[1];

  return !!(decimals && decimals.match(/0+$/));
}

function isAtDelimiter(num, str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture),
      lastIndex = str.length - 1,
      char;

  if (str.length < 1) return false;
  char = str[lastIndex];
  return !!(char === localeChar && str.indexOf(char) === lastIndex);
}

var NumberPickerInput = (0, _reactLifecyclesCompat.polyfill)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NumberPickerInput, _React$Component);

  function NumberPickerInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};

    _this.handleBlur = function (event) {
      var str = _this.state.stringValue,
          number = _this.parseNumber(str); // if number is below the min
      // we need to flush low values and decimal stops, onBlur means i'm done inputing


      if (_this.isIntermediateValue(number, str)) {
        if (isNaN(number)) {
          number = null;
        }

        _this.props.onChange(number, event);
      }
    };

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;

      var stringValue = event.target.value,
          numberValue = _this.parseNumber(stringValue);

      var isIntermediate = _this.isIntermediateValue(numberValue, stringValue);

      if (stringValue == null || stringValue.trim() === '') {
        _this.setStringValue('');

        onChange(null, event);
        return;
      } // order here matters a lot


      if (isIntermediate) {
        _this.setStringValue(stringValue);
      } else if (numberValue !== value) {
        onChange(numberValue, event);
      } else if (stringValue != _this.state.stringValue) {
        _this.setStringValue(stringValue);
      }
    };

    return _this;
  }

  var _proto = NumberPickerInput.prototype;

  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(_ref) {
    var editing = _ref.editing;
    return {
      reselectText: !editing && this.props.editing && this.isSelectingAllText()
    };
  };

  NumberPickerInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        culture = nextProps.culture,
        editing = nextProps.editing;

    var decimal = _localizers.number.decimalChar(null, culture);

    var format = getFormat(nextProps);
    if (value == null || isNaN(value)) value = '';else value = editing ? ('' + value).replace('.', decimal) : _localizers.number.format(value, format, culture);
    var stringValue = '' + value;
    if (prevState.lastValueFromProps !== stringValue) return {
      stringValue: stringValue,
      lastValueFromProps: stringValue
    };
    return null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_, __, _ref2) {
    var reselectText = _ref2.reselectText;
    if (reselectText) (0, _reactDom.findDOMNode)(this).select();
  }; // this intermediate state is for when one runs into
  // the decimal or are typing the number


  _proto.setStringValue = function setStringValue(stringValue) {
    this.setState({
      stringValue: stringValue
    });
  };

  _proto.isIntermediateValue = function isIntermediateValue(num, str) {
    var _this$props2 = this.props,
        culture = _this$props2.culture,
        min = _this$props2.min;
    return !!(num < min || isSign(str) || isAtDelimiter(num, str, culture) || isPaddedZeros(str, culture));
  };

  _proto.isSelectingAllText = function isSelectingAllText() {
    var node = _inDOM.default && (0, _reactDom.findDOMNode)(this);
    return _inDOM.default && (0, _activeElement.default)() === node && node.selectionStart === 0 && node.selectionEnd === node.value.length;
  };

  _proto.parseNumber = function parseNumber(strVal) {
    var _this$props3 = this.props,
        culture = _this$props3.culture,
        userParse = _this$props3.parse;

    var delimChar = _localizers.number.decimalChar(null, culture);

    if (userParse) return userParse(strVal, culture);
    strVal = strVal.replace(delimChar, '.');
    strVal = parseFloat(strVal);
    return strVal;
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        disabled = _this$props4.disabled,
        readOnly = _this$props4.readOnly,
        placeholder = _this$props4.placeholder,
        min = _this$props4.min,
        max = _this$props4.max;
    var value = this.state.stringValue;
    var props = Props.omitOwn(this);
    return _react.default.createElement(_Input.default, _extends({}, props, {
      className: "rw-widget-input",
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      "aria-valuenow": value,
      "aria-valuemin": isFinite(min) ? min : null,
      "aria-valuemax": isFinite(max) ? max : null,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      value: value
    }));
  };

  return NumberPickerInput;
}(_react.default.Component), _class2.defaultProps = {
  value: null,
  editing: false
}, _class2.propTypes = {
  value: _propTypes.default.number,
  editing: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  format: CustomPropTypes.numberFormat,
  parse: _propTypes.default.func,
  culture: _propTypes.default.string,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,
  onChange: _propTypes.default.func.isRequired
}, _temp)) || _class;

var _default = NumberPickerInput;
exports.default = _default;
module.exports = exports["default"];