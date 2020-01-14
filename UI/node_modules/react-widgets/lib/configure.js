"use strict";

exports.__esModule = true;
exports.default = void 0;

var localizers = _interopRequireWildcard(require("./util/localizers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = {
  setLocalizers: function setLocalizers(_ref) {
    var date = _ref.date,
        number = _ref.number;
    date && this.setDateLocalizer(date);
    number && this.setNumberLocalizer(number);
  },
  setDateLocalizer: localizers.setDate,
  setNumberLocalizer: localizers.setNumber
};
exports.default = _default;
module.exports = exports["default"];