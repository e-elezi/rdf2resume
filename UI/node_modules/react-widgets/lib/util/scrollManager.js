"use strict";

exports.__esModule = true;
exports.default = createScrollManager;

var _scrollTo = _interopRequireDefault(require("dom-helpers/util/scrollTo"));

var _reactComponentManagers = require("react-component-managers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createScrollManager(inst, getScrollParent) {
  if (getScrollParent === void 0) {
    getScrollParent = function getScrollParent(list) {
      return list.parentNode;
    };
  }

  var isMounted = (0, _reactComponentManagers.mountManager)(inst);
  var currentFocused, currentVisible, cancelScroll;

  function handleScroll(selected, list, nextFocused) {
    if (!isMounted()) return;
    var lastVisible = currentVisible;
    var lastItem = currentFocused;
    var shown, changed;
    currentVisible = !(!list.offsetWidth || !list.offsetHeight);
    currentFocused = nextFocused;
    changed = lastItem !== nextFocused;
    shown = currentVisible && !lastVisible;

    if (shown || currentVisible && changed) {
      if (this.props.onMove) this.props.onMove(selected, list, nextFocused);else {
        cancelScroll && cancelScroll();
        cancelScroll = (0, _scrollTo.default)(selected, false && getScrollParent(list));
      }
    }
  }

  return handleScroll.bind(inst);
}

module.exports = exports["default"];