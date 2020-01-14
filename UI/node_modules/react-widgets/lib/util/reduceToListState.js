"use strict";

exports.__esModule = true;
exports.defaultGetDataState = defaultGetDataState;
exports.getCommonListProps = getCommonListProps;
exports.default = reduceToListState;

var _Filter = require("./Filter");

var _ = require("./_");

var _dataHelpers = require("./dataHelpers");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var EMPTY_VALUE = {};

var returnFalse = function returnFalse() {
  return false;
};

function defaultGetDataState(data, _ref, lastState) {
  var groupBy = _ref.groupBy;

  if (lastState === void 0) {
    lastState = {};
  }

  if (lastState.data !== data || lastState.groupBy !== groupBy) {
    if (!groupBy) return {};
    var keys = [];
    var groups = (0, _.groupBySortedKeys)(groupBy, data, keys);
    return {
      data: data,
      groupBy: groupBy,
      groups: groups,
      sortedKeys: keys,
      sequentialData: Object.keys(groups).reduce(function (flat, grp) {
        return flat.concat(groups[grp]);
      }, [])
    };
  }

  return lastState;
}

var getStateGetterFromList = function getStateGetterFromList(_ref2) {
  var l = _ref2.listComponent;
  return l && l.getDataState;
};

var getIsDisabled = function getIsDisabled(disabledProp, valueField) {
  return !Array.isArray(disabledProp) ? returnFalse : function (item) {
    return disabledProp.some(function (i) {
      return (0, _dataHelpers.dataValue)(item, valueField) === (0, _dataHelpers.dataValue)(i, valueField);
    });
  };
};

function getCommonListProps(list, accessors, _ref3) {
  var groupBy = _ref3.groupBy,
      optionComponent = _ref3.optionComponent,
      itemComponent = _ref3.itemComponent,
      groupComponent = _ref3.groupComponent,
      searchTerm = _ref3.searchTerm,
      listProps = _ref3.listProps;
  return _extends({
    searchTerm: searchTerm,
    groupBy: groupBy,
    groupComponent: groupComponent,
    itemComponent: itemComponent,
    optionComponent: optionComponent
  }, listProps, {
    data: list.data,
    dataState: list.state,
    textAccessor: accessors.text,
    valueAccessor: accessors.value
  });
}

function reduceToListState(nextListData, prevList, _temp) {
  var _ref4 = _temp === void 0 ? {} : _temp,
      nextProps = _ref4.nextProps,
      getDataState = _ref4.getDataState;

  var disabled = nextProps.disabled,
      valueField = nextProps.valueField,
      textField = nextProps.textField;
  getDataState = getDataState || getStateGetterFromList(nextProps) || defaultGetDataState;
  var dataState = getDataState(nextListData, nextProps, prevList && prevList.dataState);
  var data = dataState && dataState.sequentialData || nextListData;
  var isDisabled = getIsDisabled(disabled, valueField);

  var moveNext = function moveNext(item, word) {
    return isDisabled(item) || word && !_Filter.presets.startsWith((0, _dataHelpers.dataText)(item, textField).toLowerCase(), word.toLowerCase());
  };

  var list = {
    dataState: dataState,
    isDisabled: isDisabled,
    first: function first() {
      return list.next(EMPTY_VALUE);
    },
    last: function last() {
      return list.prevEnabled(data[data.length - 1]);
    },
    prev: function prev(item, word) {
      var nextIdx = Math.max(0, data.indexOf(item)) - 1;

      while (nextIdx > -1 && moveNext(data[nextIdx], word)) {
        nextIdx--;
      }

      if (nextIdx >= 0) return data[nextIdx];
      return isDisabled(item) ? null : item;
    },
    next: function next(item, word) {
      var nextIdx = data.indexOf(item) + 1;

      while (nextIdx < data.length && moveNext(data[nextIdx], word)) {
        nextIdx++;
      }

      if (nextIdx < data.length) return data[nextIdx];
      return isDisabled(item) ? null : item;
    },
    prevEnabled: function prevEnabled(item) {
      return isDisabled(item) ? list.prev(item) : item;
    },
    nextEnabled: function nextEnabled(item) {
      return isDisabled(item) ? list.next(item) : item;
    }
  };
  return list;
}