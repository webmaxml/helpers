import { assert } from 'chai';
import { anyObj, anyFunc, anyArray } from '../types/common';
import h from '../src/helpers';

suite( 'isEqual()', function() {

	suite( 'equal types, equal values', function() {
		test( 'for "a", "a" - true', function() {
			assert.strictEqual( h.isEqual( 'a', 'a' ), true );
		} );

		test( 'for 42, 42 - true', function() {
			assert.strictEqual( h.isEqual( 42, 42 ), true );
		} );

		test( 'for false, false - true', function() {
			assert.strictEqual( h.isEqual( false, false ), true );
		} );

		test( 'for null, null - true', function() {
			assert.strictEqual( h.isEqual( null, null ), true );
		} );

		test( 'for undefined, undefined - true', function() {
			assert.strictEqual( h.isEqual( undefined, undefined ), true );
		} );

		test( 'for [], [] - true', function() {
			assert.strictEqual( h.isEqual( [], [] ), true );
		} );

		test( 'for {}, {} - true', function() {
			assert.strictEqual( h.isEqual( {}, {} ), true );
		} );

		test( 'for [ 1, { x: 5 } ], [ 1, { x: 5 } ] - true', function() {
			assert.strictEqual( h.isEqual( [ 1, { x: 5 } ], [ 1, { x: 5 } ] ), true );
		} );

		test( 'for { a: [ 1 ], b: { x: true } }, { a: [ 1 ], b: { x: true } } - true', function() {
			assert.strictEqual( h.isEqual( { 
				a: [ 1 ], 
				b: { x: true } 
			}, { 
				a: [ 1 ], 
				b: { x: true } 
			}, ), true );
		} );

		test( 'for 2 same functions - true', function() {
			const func: anyFunc = () => {};
			assert.strictEqual( h.isEqual( func, func ), true );
		} );
	} )

	suite( 'equal types, not equal values', function() {
		test( 'for "a", "aa" - false', function() {
			assert.strictEqual( h.isEqual( 'a', 'aa' ), false );
		} );

		test( 'for 42, 67 - false', function() {
			assert.strictEqual( h.isEqual( 42, 67 ), false );
		} );

		test( 'for false, true - false', function() {
			assert.strictEqual( h.isEqual( false, true ), false );
		} );

		test( 'for [ 1, { x: 1 } ], [ 1, { x: 2 } ] ) - false', function() {
			assert.strictEqual( h.isEqual( [ 1, { x: 1 } ], [ 1, { x: 2 } ] ), false );
		} );

		test( 'for { a: [ 1 ], b: { x: true } }, { a: [ 1 ], b: { x: false } } - false', function() {
			assert.strictEqual( h.isEqual( { 
				a: [ 1 ], 
				b: { x: true } 
			}, { 
				a: [ 1 ], 
				b: { x: false } 
			}, ), false );
		} );

		test( 'for () => {}, () => {} - false', function() {
			assert.strictEqual( h.isEqual( () => {}, () => {} ), false );
		} );
	} )

	suite( 'not equal types', function() {
		test( 'for 42, "42" - false', function() {
			assert.strictEqual( h.isEqual( 42, '42' ), false );
		} );

		test( 'for false, "" - false', function() {
			assert.strictEqual( h.isEqual( false, '' ), false );
		} );

		test( 'for true, 1 - false', function() {
			assert.strictEqual( h.isEqual( true, 1 ), false );
		} );

		test( 'for null, 0 - false', function() {
			assert.strictEqual( h.isEqual( null, 0 ), false );
		} );

		test( 'for {}, [] - false', function() {
			assert.strictEqual( h.isEqual( [], {} ), false );
		} );

		test( 'for {}, () => {} - false', function() {
			assert.strictEqual( h.isEqual( {}, () => {} ), false );
		} );

		test( 'for {}, null - false', function() {
			assert.strictEqual( h.isEqual( {}, null ), false );
		} );

		test( 'for null, undefined - false', function() {
			assert.strictEqual( h.isEqual( null, undefined ), false );
		} );
	} )

} );

suite( 'getChangedProps()', function() {

	test( 'if objects are the same - returns empty object', function() {
		const result: anyObj = h.getChangedProps( { a: 1 }, { a: 1 } );
		assert.deepEqual( result, {} );
	} );

	test( 'for { x: 1 }, { x: 2 } - { x: 2 }', function() {
		const result: anyObj = h.getChangedProps( { x: 1 }, { x: 2 } );
		assert.deepEqual( result, { x: 2 } );
	} );

	test( 'for { a: 1 }, { x: 1 } - { x: 1 }', function() {
		const result: anyObj = h.getChangedProps( { a: 1 }, { x: 1 } );
		assert.deepEqual( result, { x: 1 } );
	} );

	test( 'for { a: 0, x: [ 1, 2 ] }, { a: 0, x: [ 1, 3 ] } - { x: [ 1, 3 ] }', function() {
		const target: anyObj = { a: 0, x: [ 1, 2 ] };
		const test: anyObj =   { a: 0, x: [ 1, 3 ] };
		const result: anyObj = h.getChangedProps( target, test );
		assert.deepEqual( result, { x: [ 1, 3 ] } );
	} );

	test( 'for { x: { a: 1 } }, { x: { b: 1 } } - { x: { b: 1 } }', function() {
		const target: anyObj = { x: { a: 1 } };
		const test: anyObj = { x: { b: 1 } };
		const result: anyObj = h.getChangedProps( target, test );
		assert.deepEqual( result, { x: { b: 1 } } );
	} );

} );

suite( 'eventNameToFuncName()', function() {

	test( 'for select - onSelect', function() {
		assert.deepEqual( h.eventNameToFuncName( 'select' ), 'onSelect' );
	} );

	test( 'for change:items - onItemsChange', function() {
		assert.deepEqual( h.eventNameToFuncName( 'change:items' ), 'onItemsChange' );
	} );

} );