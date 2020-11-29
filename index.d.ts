import { anyObj } from './types/common';

declare namespace h {
	function isEqual( val1: unknown, val2: unknown ): boolean;
	function getChangedProps( oldObj: anyObj, newObj: anyObj ): anyObj;
	function eventNameToFuncName( str: string ): string;
	function firstCharUppercase( str: string ): string;
}

export = h;