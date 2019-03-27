// Source: https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/block-edit/context.js

/**
 * External dependencies
 */
import noop from 'lodash.noop';

/**
 * WordPress dependencies
 */
const { createContext } = wp.element;
const { createHigherOrderComponent } = wp.compose;

const { Consumer } = createContext( {
	name: '',
	isSelected: false,
	focusedElement: null,
	setFocusedElement: noop,
	clientId: null,
} );

/**
 * A Higher Order Component used to inject BlockEdit context to the
 * wrapped component.
 *
 * @param {Function} mapContextToProps Function called on every context change,
 *                                     expected to return object of props to
 *                                     merge with the component's own props.
 *
 * @return {Component} Enhanced component with injected context as props.
 */
export const withBlockEditContext = ( mapContextToProps ) => createHigherOrderComponent( ( OriginalComponent ) => {
	return ( props ) => (
		<Consumer>
			{ ( context ) => (
				<OriginalComponent
					{ ...props }
					{ ...mapContextToProps( context, props ) }
				/>
			) }
		</Consumer>
	);
}, 'withBlockEditContext' );
