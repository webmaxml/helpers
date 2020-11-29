export interface funcThatReturns<T> { ( ...args: any[] ): T; }
export interface objWithValues<T> { [prop: string]: T; }

export interface anyFunc extends funcThatReturns<unknown> {}
export interface anyObj extends objWithValues<unknown> {}
export interface anyArray extends Array<unknown> {}