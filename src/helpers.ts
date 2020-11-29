import { anyObj } from '../types/common';
import * as g from './guards';

const h = {

	isEqual( val1: unknown, val2: unknown ): boolean {
		// if types differ - false
		if ( typeof val1 !== typeof val2 ) { return false; }

		// if types and values are the same - true
		if ( val1 === val2 ) { return true; }
		
		if ( g.isAnyArray( val1 ) && g.isAnyArray( val2 ) ) {
			// if elements length is not the same - false
			if ( val1.length != val2.length ) { return false; }

			// recursively checking elements for equality
			return val1.every( ( elem: any, i: number ) => this.isEqual( val1[ i ], val2[ i ] ) );
		}

		if ( g.isAnyObject( val1 ) && g.isAnyObject( val2 ) ) {
			const val1Keys: string[] = Object.keys( val1 );
			const val2Keys: string[] = Object.keys( val2 );

			// if keys are not the same - false
			if ( !this.isEqual( val1Keys, val2Keys ) ) { return false; }

			// recursively checking values for equality
			return val1Keys.every( ( key: string ) => {
				return this.isEqual( val1[ key ], val2[ key ] );
			} );
		}

		// this means that values are not objects and their values differ
		return false;
	},

	getChangedProps( oldObj: anyObj, newObj: anyObj ): anyObj {
		const changed: anyObj = {};
		Object.keys( newObj ).forEach( ( key: string ) => {
			if( !this.isEqual( newObj[ key ], oldObj[ key ] ) ) {
				changed[ key ] = newObj[ key ];
			}
		} );

		return changed;
	},

	eventNameToFuncName( str: string ): string {
		let eventName: string = this.firstCharUppercase( str );
		let postfix: string = '';

		// if : present, eventName is what after it and postfix is what before it
		if ( str.includes( ':' ) ) {
			const i: number = str.indexOf(':');
			eventName = this.firstCharUppercase( str.slice( i + 1 ) );
			postfix = this.firstCharUppercase( str.slice( 0, i ) );
		}

		return `on${eventName}${postfix}`;		
	},

	firstCharUppercase( str: string ): string {
		return str[0].toUpperCase() + str.slice(1);
	}

}

export default h;