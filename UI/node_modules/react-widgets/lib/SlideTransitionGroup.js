"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _events = _interopRequireDefault(require("dom-helpers/events"));

var _style = _interopRequireDefault(require("dom-helpers/style"));

var _height = _interopRequireDefault(require("dom-helpers/query/height"));

var _properties = require("dom-helpers/transition/properties");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TransitionGroup = _interopRequireDefault(require("react-transition-group/TransitionGroup"));

var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var Props = _interopRequireWildcard(require("./util/Props"));

var _transitionStyle, _transitionClasses;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DirectionPropType = _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']);

var transitionStyle = (_transitionStyle = {}, _transitionStyle[_Transition.ENTERING] = {
  position: 'absolute'
}, _transitionStyle[_Transition.EXITING] = {
  position: 'absolute'
}, _transitionStyle);
var transitionClasses = (_transitionClasses = {}, _transitionClasses[_Transition.ENTERED] = 'rw-calendar-transition-entered', _transitionClasses[_Transition.ENTERING] = 'rw-calendar-transition-entering', _transitionClasses[_Transition.EXITING] = 'rw-calendar-transition-exiting', _transitionClasses[_Transition.EXITED] = 'rw-calendar-transition-exited', _transitionClasses);

function parseDuration(node) {
  var str = (0, _style.default)(node, _properties.transitionDuration);
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

var SlideTransition =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SlideTransition, _React$Component);

  function SlideTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleTransitionEnd = function (node, done) {
      var duration = parseDuration(node) || 300;

      var handler = function handler() {
        _events.default.off(node, _properties.transitionEnd, handler, false);

        done();
      };

      setTimeout(handler, duration * 1.5);

      _events.default.on(node, _properties.transitionEnd, handler, false);
    };

    return _this;
  }

  var _proto = SlideTransition.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["children"]);

    var direction = this.context.direction;

    var child = _react.default.Children.only(children);

    return _react.default.createElement(_Transition.default, _extends({}, props, {
      timeout: 5000,
      addEndListener: this.handleTransitionEnd
    }), function (status, innerProps) {
      return _react.default.cloneElement(child, _extends({}, innerProps, {
        style: transitionStyle[status],
        className: (0, _classnames.default)(child.props.className, 'rw-calendar-transition', "rw-calendar-transition-" + direction, transitionClasses[status])
      }));
    });
  };

  return SlideTransition;
}(_react.default.Component);

SlideTransition.contextTypes = {
  direction: DirectionPropType
};

var SlideTransitionGroup =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(SlideTransitionGroup, _React$Component2);

  function SlideTransitionGroup() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;

    _this2.handleEnter = function (child) {
      var node = (0, _reactDom.findDOMNode)(_assertThisInitialized(_assertThisInitialized(_this2)));
      if (!child) return;
      var height = (0, _height.default)(child) + 'px';
      (0, _style.default)(node, {
        height: height,
        overflow: 'hidden'
      });
    };

    _this2.handleExited = function () {
      var node = (0, _reactDom.findDOMNode)(_assertThisInitialized(_assertThisInitialized(_this2)));
      (0, _style.default)(node, {
        overflow: '',
        height: ''
      });
    };

    return _this2;
  }

  var _proto2 = SlideTransitionGroup.prototype;

  _proto2.getChildContext = function getChildContext() {
    return {
      direction: this.props.direction
    };
  };

  _proto2.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        direction = _this$props2.direction;
    return _react.default.createElement(_TransitionGroup.default, _extends({}, Props.omitOwn(this), {
      component: "div",
      className: "rw-calendar-transition-group"
    }), _react.default.createElement(SlideTransition, {
      key: children.key,
      direction: direction,
      onEnter: this.handleEnter,
      onExited: this.handleExited
    }, children));
  };

  return SlideTransitionGroup;
}(_react.default.Component);

SlideTransitionGroup.childContextTypes = {
  direction: DirectionPropType
};
SlideTransitionGroup.defaultProps = {
  direction: 'left'
};
SlideTransitionGroup.propTypes = {
  direction: DirectionPropType
};
var _default = SlideTransitionGroup;
exports.default = _default;
module.exports = exports["default"];