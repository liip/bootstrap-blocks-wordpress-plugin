
import { alignBottom, alignCenter, alignTop } from './icons';

const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody } = wp.components;
const { Component, Fragment } = wp.element;
const { withSelect, withDispatch } = wp.data;
const { applyFilters } = wp.hooks;
const { compose } = wp.compose;

const ALLOWED_BLOCKS = [ 'wp-bootstrap-blocks/column' ];
let templates = {
	'1-1': {
		label: __( '2 Columns (1:1)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
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
	'1-2': {
		label: __( '2 Columns (1:2)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
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
	'2-1': {
		label: __( '2 Columns (2:1)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
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
	'1-1-1': {
		label: __( '3 Columns (1:1:1)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
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
};
templates = applyFilters( 'wpBootstrapBlocks.row.templates', templates );

const enableCustomTemplate = applyFilters( 'wpBootstrapBlocks.row.enableCustomTemplate', true );
if ( enableCustomTemplate ) {
	templates.custom = {
		label: __( 'Custom', 'wp-bootstrap-blocks' ),
		templateLock: false,
		blocks: [
			[ 'wp-bootstrap-blocks/column' ],
		],
	};
}

const getColumnsTemplate = ( template ) => {
	return templates[ template ] ? templates[ template ].blocks : [];
};
const getColumnsTemplateLock = ( template ) => {
	return templates[ template ] ? templates[ template ].templateLock : false;
};

class BootstrapRowEdit extends Component {
	render() {
		const { className, attributes, setAttributes, columns, updateBlockAttributes } = this.props;

		const { template, noGutters, alignment, verticalAlignment } = attributes;
		const templateOptions = [];
		Object.keys( templates ).forEach( ( templateName ) => {
			templateOptions.push( {
				label: templates[ templateName ].label,
				value: templateName,
			} );
		} );
		const onTemplateChange = ( selectedTemplate ) => {
			if ( templates[ selectedTemplate ] ) {
				// Update sizes to fit with selected template
				columns.forEach( ( column, index ) => {
					if ( templates[ selectedTemplate ].blocks.length > index ) {
						const newAttributes = templates[ selectedTemplate ].blocks[ index ][ 1 ];
						updateBlockAttributes( column.clientId, newAttributes );
					}
				} );

				setAttributes( {
					template: selectedTemplate,
				} );
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
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Template', 'wp-bootstrap-blocks' ) }
							value={ template }
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
				<div className={ className }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ getColumnsTemplate( template ) }
						templateLock={ getColumnsTemplateLock( template ) }
					/>
				</div>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( ( select, { clientId } ) => {
	const { getBlocksByClientId } = select( 'core/editor' );

	const columns = getBlocksByClientId( clientId )[ 0 ] ? getBlocksByClientId( clientId )[ 0 ].innerBlocks : [];

	return {
		columns,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { updateBlockAttributes } = dispatch( 'core/editor' );

	return {
		updateBlockAttributes,
	};
} );

export default compose(
	applyWithSelect,
	applyWithDispatch,
)( BootstrapRowEdit );
