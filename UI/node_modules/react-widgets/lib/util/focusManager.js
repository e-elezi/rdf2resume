"use strict";

exports.__esModule = true;
exports.default = createFocusManager;

var _reactComponentManagers = require("react-component-managers");

var _interaction = require("./interaction");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createFocusManager(inst, options) {
  var _didHandle = options.didHandle;
  return (0, _reactComponentManagers.focusManager)(inst, _extends({}, options, {
    onChange: function onChange(focused) {
      inst.setState({
        focused: focused
      });
    },
    isDisabled: function isDisabled() {
      return inst.props.disabled === true || (0, _interaction.isInDisabledFieldset)(inst);
    },
    didHandle: function didHandle(focused, event) {
      var handler = this.props[focused ? 'onFocus' : 'onBlur'];
      handler && handler(event);
      if (_didHandle && !event.isWidgetDefaultPrevented) _didHandle(focused, event);
    }
  }));
}

module.exports = exports["default"];