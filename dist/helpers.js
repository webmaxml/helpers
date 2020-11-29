"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var g = _interopRequireWildcard(require("./guards"));

var h = {
  isEqual: function isEqual(val1, val2) {
    var _this = this;

    // if types differ - false
    if ((0, _typeof2.default)(val1) !== (0, _typeof2.default)(val2)) {
      return false;
    } // if types and values are the same - true


    if (val1 === val2) {
      return true;
    }

    if (g.isAnyArray(val1) && g.isAnyArray(val2)) {
      // if elements length is not the same - false
      if (val1.length != val2.length) {
        return false;
      } // recursively checking elements for equality


      return val1.every(function (elem, i) {
        return _this.isEqual(val1[i], val2[i]);
      });
    }

    if (g.isAnyObject(val1) && g.isAnyObject(val2)) {
      var val1Keys = Object.keys(val1);
      var val2Keys = Object.keys(val2); // if keys are not the same - false

      if (!this.isEqual(val1Keys, val2Keys)) {
        return false;
      } // recursively checking values for equality


      return val1Keys.every(function (key) {
        return _this.isEqual(val1[key], val2[key]);
      });
    } // this means that values are not objects and their values differ


    return false;
  },
  getChangedProps: function getChangedProps(oldObj, newObj) {
    var _this2 = this;

    var changed = {};
    Object.keys(newObj).forEach(function (key) {
      if (!_this2.isEqual(newObj[key], oldObj[key])) {
        changed[key] = newObj[key];
      }
    });
    return changed;
  },
  eventNameToFuncName: function eventNameToFuncName(str) {
    var eventName = this.firstCharUppercase(str);
    var postfix = ''; // if : present, eventName is what after it and postfix is what before it

    if (str.includes(':')) {
      var i = str.indexOf(':');
      eventName = this.firstCharUppercase(str.slice(i + 1));
      postfix = this.firstCharUppercase(str.slice(0, i));
    }

    return "on".concat(eventName).concat(postfix);
  },
  firstCharUppercase: function firstCharUppercase(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
};
var _default = h;
exports.default = _default;