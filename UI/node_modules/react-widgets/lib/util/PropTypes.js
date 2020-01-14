"use strict";

exports.__esModule = true;
exports.message = exports.accessor = exports.disabled = exports.dateFormat = exports.numberFormat = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

exports.elementType = _elementType.default;

var _createChainableTypeChecker = _interopRequireDefault(require("prop-types-extra/lib/utils/createChainableTypeChecker"));

var _localizers = require("./localizers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberFormat = (0, _createChainableTypeChecker.default)(function () {
  return _localizers.number.propType.apply(_localizers.number, arguments);
});
exports.numberFormat = numberFormat;
var dateFormat = (0, _createChainableTypeChecker.default)(function () {
  return _localizers.date.propType.apply(_localizers.date, arguments);
});
exports.dateFormat = dateFormat;
var disabled = (0, _createChainableTypeChecker.default)(function () {
  return _propTypes.default.bool.apply(_propTypes.default, arguments);
});
exports.disabled = disabled;
disabled.acceptsArray = _propTypes.default.oneOfType([disabled, _propTypes.default.array]);

var accessor = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

exports.accessor = accessor;

var message = _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string, _propTypes.default.func]);

exports.message = message;