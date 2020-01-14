"use strict";

exports.__esModule = true;
exports.setNumber = setNumber;
exports.setDate = setDate;
exports.date = exports.number = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _ = require("./_");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localePropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

var REQUIRED_NUMBER_FORMATS = ['default'];
var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'weekday', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

var _numberLocalizer = createWrapper('NumberPicker');

var number = {
  propType: function propType() {
    var _numberLocalizer2;

    return (_numberLocalizer2 = _numberLocalizer).propType.apply(_numberLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _numberLocalizer.formats[key];
  },
  parse: function parse() {
    var _numberLocalizer3;

    return (_numberLocalizer3 = _numberLocalizer).parse.apply(_numberLocalizer3, arguments);
  },
  format: function format() {
    var _numberLocalizer4;

    return (_numberLocalizer4 = _numberLocalizer).format.apply(_numberLocalizer4, arguments);
  },
  decimalChar: function decimalChar() {
    var _numberLocalizer5;

    return (_numberLocalizer5 = _numberLocalizer).decimalChar.apply(_numberLocalizer5, arguments);
  },
  precision: function precision() {
    var _numberLocalizer6;

    return (_numberLocalizer6 = _numberLocalizer).precision.apply(_numberLocalizer6, arguments);
  }
};
exports.number = number;

function setNumber(_ref) {
  var format = _ref.format,
      _parse = _ref.parse,
      formats = _ref.formats,
      _ref$propType = _ref.propType,
      propType = _ref$propType === void 0 ? localePropType : _ref$propType,
      _ref$decimalChar = _ref.decimalChar,
      decimalChar = _ref$decimalChar === void 0 ? function () {
    return '.';
  } : _ref$decimalChar,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? function () {
    return null;
  } : _ref$precision;
  checkFormats(REQUIRED_NUMBER_FORMATS, formats);
  _numberLocalizer = {
    formats: formats,
    precision: precision,
    decimalChar: decimalChar,
    propType: propType,
    format: wrapFormat(format),
    parse: function parse(value, culture, format) {
      var result = _parse.call(this, value, culture, format);

      !(result == null || typeof result === 'number') ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'number localizer `parse(..)` must return a number, null, or undefined') : invariant(false) : void 0;
      return result;
    }
  };
}

var _dateLocalizer = createWrapper('DateTimePicker');

var date = {
  propType: function propType() {
    var _dateLocalizer2;

    return (_dateLocalizer2 = _dateLocalizer).propType.apply(_dateLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _dateLocalizer.formats[key];
  },
  parse: function parse() {
    var _dateLocalizer3;

    return (_dateLocalizer3 = _dateLocalizer).parse.apply(_dateLocalizer3, arguments);
  },
  format: function format() {
    var _dateLocalizer4;

    return (_dateLocalizer4 = _dateLocalizer).format.apply(_dateLocalizer4, arguments);
  },
  firstOfWeek: function firstOfWeek() {
    var _dateLocalizer5;

    return (_dateLocalizer5 = _dateLocalizer).firstOfWeek.apply(_dateLocalizer5, arguments);
  }
};
exports.date = date;

function setDate(_ref2) {
  var formats = _ref2.formats,
      format = _ref2.format,
      _parse2 = _ref2.parse,
      firstOfWeek = _ref2.firstOfWeek,
      _ref2$propType = _ref2.propType,
      propType = _ref2$propType === void 0 ? localePropType : _ref2$propType;
  checkFormats(REQUIRED_DATE_FORMATS, formats);
  _dateLocalizer = {
    formats: formats,
    propType: propType,
    firstOfWeek: firstOfWeek,
    format: wrapFormat(format),
    parse: function parse(value, format, culture) {
      var result = _parse2.call(this, value, format, culture);

      !(result == null || result instanceof Date && !isNaN(result.getTime())) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'date localizer `parse(..)` must return a valid Date, null, or undefined') : invariant(false) : void 0;
      return result;
    }
  };
}

var wrapFormat = function wrapFormat(formatter) {
  return function (value, format, culture) {
    var result = typeof format === 'function' ? format(value, culture, this) : formatter.call(this, value, format, culture);
    !(result == null || typeof result === 'string') ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, '`localizer format(..)` must return a string, null, or undefined') : invariant(false) : void 0;
    return result;
  };
};

function checkFormats(required, formats) {
  if (process.env.NODE_ENV !== 'production') required.forEach(function (f) {
    return !(0, _.has)(formats, f) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'localizer missing required format: `%s`', f) : invariant(false) : void 0;
  });
}

function createWrapper() {
  var dummy = {};

  if (process.env.NODE_ENV !== 'production') {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision', 'propType'].forEach(function (name) {
      return Object.defineProperty(dummy, name, {
        enumerable: true,
        get: function get() {
          throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
        }
      });
    });
  }

  return dummy;
}