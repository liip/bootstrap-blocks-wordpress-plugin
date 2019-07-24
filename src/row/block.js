/**
 * BLOCK: wp-bootstrap-blocks/row
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import { times } from 'lodash';
import { alignBottom, alignCenter, alignTop } from './icons';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody, SVG, Path } = wp.components;
const { Fragment } = wp.element;
const { dispatch, select } = wp.data;
const { applyFilters } = wp.hooks;

const ALLOWED_BLOCKS = [ 'wp-bootstrap-blocks/column' ];

let templates = [
	{
		title: __( '2 Columns (1:1)', 'wp-bootstrap-blocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z" /></SVG>,
		template: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 6,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 6,
				},
			],
		],
	},
	{
		title: __( '2 Columns (1:2)', 'wp-bootstrap-blocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z" /></SVG>,
		template: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 8,
				},
			],
		],
	},
	{
		title: __( '2 Columns (2:1)', 'wp-bootstrap-blocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z" /></SVG>,
		template: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 8,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
		],
	},
	{
		title: __( '3 Columns (1:1:1)', 'wp-bootstrap-blocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z" /></SVG>,
		template: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
		],
	},
];
templates = applyFilters( 'wpBootstrapBlocks.row.templates', templates );

const templateLock = applyFilters( 'wpBootstrapBlocks.row.templateLock', false );

const getColumnsTemplate = ( columns ) => {
	if ( columns === undefined ) {
		return null;
	}
	return times( columns, () => [ 'wp-bootstrap-blocks/column' ] );
};

registerBlockType( 'wp-bootstrap-blocks/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Row', 'wp-bootstrap-blocks' ), // Block title.
	icon: 'layout', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
		__( 'Row', 'wp-bootstrap-blocks' ),
	],

	supports: {
		align: [ 'full' ],
	},

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	getEditWrapperProps( attributes ) {
		return {
			'data-alignment': attributes.alignment,
			'data-vertical-alignment': attributes.verticalAlignment,
		};
	},

	edit( { className, attributes, setAttributes, clientId } ) {
		const { noGutters, alignment, verticalAlignment } = attributes;

		const { count } = useSelect( ( select ) => {
			return {
				count: select( 'core/block-editor' ).getBlockCount( clientId ),
			};
		} );
		const [ template, setTemplate ] = useState( getColumnsTemplate( count ) );
		const [ forceUseTemplate, setForceUseTemplate ] = useState( false );

		const showTemplateSelector = ( count === 0 && ! forceUseTemplate ) || ! template;

		const templateOptions = [];
		templates.forEach( ( template, i ) => {
			templateOptions.push( {
				label: template.title,
				value: i,
			} );
		} );
		const onTemplateChange = ( templateIndex ) => {
			if ( templates[ templateIndex ] ) {
				// Grab columns of existing block
				const cols = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks;

				// Update sizes to fit with selected template
				cols.forEach( ( col, index ) => {
					if ( templates[ templateIndex ].template.length > index ) {
						const newAttributes = templates[ templateIndex ].template[ index ][ 1 ];
						dispatch( 'core/editor' ).updateBlockAttributes( col.clientId, newAttributes );
					}
				} );

				setTemplate( templates[ templateIndex ].template );
			}
		};

		const alignmentControls = [
			{
				icon: 'editor-alignleft',
				title: __( 'Align columns left', 'wp-bootstrap-blocks' ),
				align: 'left',
			},
			{
				icon: 'editor-aligncenter',
				title: __( 'Align columns center', 'wp-bootstrap-blocks' ),
				align: 'center',
			},
			{
				icon: 'editor-alignright',
				title: __( 'Align columns right', 'wp-bootstrap-blocks' ),
				align: 'right',
			},
		];

		const verticalAlignmentControls = [
			{
				icon: alignTop,
				title: __( 'Align columns top', 'wp-bootstrap-blocks' ),
				align: 'top',
			},
			{
				icon: alignCenter,
				title: __( 'Align columns center', 'wp-bootstrap-blocks' ),
				align: 'center',
			},
			{
				icon: alignBottom,
				title: __( 'Align columns bottom', 'wp-bootstrap-blocks' ),
				align: 'bottom',
			},
		];

		return (
			<Fragment>
				{ ! showTemplateSelector && (
					<Fragment>
						<InspectorControls>
							<PanelBody>
								<SelectControl
									label={ __( 'Template', 'wp-bootstrap-blocks' ) }
									options={ templateOptions }
									onChange={ selectedTemplate => {
										onTemplateChange( selectedTemplate );
									} }
								/>
								<CheckboxControl
									label={ __( 'No Gutters', 'wp-bootstrap-blocks' ) }
									checked={ noGutters }
									onChange={ isChecked => setAttributes( { noGutters: isChecked } ) }
								/>
							</PanelBody>
						</InspectorControls>
						<BlockControls>
							<AlignmentToolbar
								value={ alignment }
								onChange={ newAlignment => setAttributes( { alignment: newAlignment } ) }
								alignmentControls={ alignmentControls }
							/>
							<AlignmentToolbar
								value={ verticalAlignment }
								onChange={ newVerticalAlignment => setAttributes( { verticalAlignment: newVerticalAlignment } ) }
								alignmentControls={ verticalAlignmentControls }
							/>
						</BlockControls>
					</Fragment>
				) }
				<div className={ className }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ showTemplateSelector ? null : template }
						__experimentalTemplateOptions={ templates }
						__experimentalOnSelectTemplateOption={ ( nextTemplate ) => {
							if ( nextTemplate === undefined ) {
								nextTemplate = getColumnsTemplate( 2 );
							}
	
							setTemplate( nextTemplate );
							setForceUseTemplate( true );
						} }
						__experimentalAllowTemplateOptionSkip
						templateLock={ templateLock }
					/>
				</div>
			</Fragment>
		);
	},

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
