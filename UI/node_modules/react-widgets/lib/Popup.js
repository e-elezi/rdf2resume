"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _SlideDownTransition = _interopRequireDefault(require("./SlideDownTransition"));

var _PropTypes = require("./util/PropTypes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var StaticContainer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StaticContainer, _React$Component);

  function StaticContainer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = StaticContainer.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
    var shouldUpdate = _ref.shouldUpdate;
    return !!shouldUpdate;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["className", "children"]);

    delete props.shouldUpdate;
    return (0, _react.cloneElement)(children, _extends({}, props, {
      className: (0, _classnames.default)(className, children.props.className, 'rw-popup')
    }));
  };

  return StaticContainer;
}(_react.default.Component);

StaticContainer.propTypes = {
  shouldUpdate: function shouldUpdate() {}
};

var Popup =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(Popup, _React$Component2);

  function Popup() {
    return _React$Component2.apply(this, arguments) || this;
  }

  var _proto2 = Popup.prototype;

  _proto2.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        dropUp = _this$props2.dropUp,
        open = _this$props2.open,
        Transition = _this$props2.transition,
        props = _objectWithoutProperties(_this$props2, ["className", "dropUp", "open", "transition"]);

    return _react.default.createElement(Transition, _extends({}, props, {
      in: open,
      dropUp: dropUp,
      className: (0, _classnames.default)(className, 'rw-popup-container')
    }), _react.default.createElement(StaticContainer, {
      shouldUpdate: open
    }, _react.default.Children.only(this.props.children)));
  };

  return Popup;
}(_react.default.Component);

Popup.defaultProps = {
  open: false,
  transition: _SlideDownTransition.default
};
Popup.propTypes = {
  open: _propTypes.default.bool,
  dropUp: _propTypes.default.bool,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  transition: _PropTypes.elementType
};
var _default = Popup;
exports.default = _default;
module.exports = exports["default"];