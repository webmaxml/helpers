"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyFunction = isAnyFunction;
exports.isAnyObject = isAnyObject;
exports.isAnyArray = isAnyArray;

function isAnyFunction(value) {
  return typeof value === 'function';
}

function isAnyObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isAnyArray(value) {
  return Array.isArray(value);
}