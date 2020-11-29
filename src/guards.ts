import { anyObj, anyFunc, anyArray } from '../types/common';

export function isAnyFunction(value: unknown): value is anyFunc {
	return typeof value === 'function';
}

export function isAnyObject(value: unknown): value is anyObj {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function isAnyArray(value: unknown): value is anyArray {
	return Array.isArray(value);
}

