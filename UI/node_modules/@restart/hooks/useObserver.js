"use strict";

exports.__esModule = true;
exports.default = useObserver;

var _react = require("react");

var _useEventCallback = _interopRequireDefault(require("./useEventCallback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var targetMap = new WeakMap();
var observer;

function getObserver(Observer) {
  // eslint-disable-next-line no-return-assign
  return observer = observer || new Observer(function (entries) {
    entries.forEach(function (entry) {
      var handler = targetMap.get(entry.target);
      if (handler) handler(entry);
    });
  });
}

function useObserver(MyObserver, element, handler, leadingHandler) {
  var handlerCallback = (0, _useEventCallback.default)(handler);
  (0, _react.useLayoutEffect)(function () {
    if (!element) return;
    getObserver(MyObserver).observe(element);
    if (leadingHandler) leadingHandler(element);
    targetMap.set(element, handlerCallback);
    return function () {
      targetMap.delete(element);
    };
  }, [element]);
}