import times from 'lodash.times';
import { alignBottom, alignCenter, alignTop, templateIconMissing } from './icons';

const { __ } = wp.i18n;
const { InnerBlocks, InnerBlocksTemplatePicker, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton, Button, CheckboxControl, PanelBody, SVG, Path } = wp.components;
const { Component, Fragment } = wp.element;
const { withSelect, withDispatch } = wp.data;
const { applyFilters } = wp.hooks;
const { compose } = wp.compose;

const templatePickerAvailable = !! InnerBlocksTemplatePicker;

const ALLOWED_BLOCKS = [ 'wp-bootstrap-blocks/column' ];

const perpareTemplates = templates => {
	// If templates are already in new structure do nothing
	if ( Array.isArray( templates ) ) {
		return templates;
	}
	return Object.keys( templates ).map( templateName => {
		return {
			title: templates[ templateName ].title || templates[ templateName ].label,
			icon: templates[ templateName ].icon || templateIconMissing,
			template: templates[ templateName ].template || templates[ templateName ].blocks,
			name: templateName,
		};
	} );
};

let templates = {
	'1-1': {
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
	'1-2': {
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
	'2-1': {
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
	'1-1-1': {
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
};
templates = applyFilters( 'wpBootstrapBlocks.row.templates', templates );
templates = perpareTemplates( templates ); // Ensure backwards compatibility to older templates structure

const enableCustomTemplate = applyFilters( 'wpBootstrapBlocks.row.enableCustomTemplate', true );
const customTemplateColumnCount = applyFilters( 'wpBootstrapBlocks.row.customTemplateColumnCount', 2 );

const getColumnsTemplate = ( columnCount ) => {
	if ( columnCount === undefined ) {
		return null;
	}
	return times( columnCount, () => [
		'wp-bootstrap-blocks/column',
		{
			sizeMd: columnCount ? 12 / columnCount : 12,
		},
	] );
};
const getDefaultTemplate = () => templates.length > 0 ? templates[ 0 ].template : null;
const getColumnsTemplateLock = isCustomTemplate => isCustomTemplate ? false : 'all';

class BootstrapRowEdit extends Component {
	constructor( props ) {
		super( ...props );
		let template = null;
		if ( props.columnCount !== 0 ) {
			template = getColumnsTemplate( props.columnCount );
		} else if ( templatePickerAvailable ) {
			template = null;
		} else {
			template = getDefaultTemplate();
		}
		this.state = {
			template,
		};
	}

	render() {
		const { className, attributes, setAttributes, columns, updateBlockAttributes } = this.props;
		const { template } = this.state;
		const { isCustomTemplate, noGutters, alignment, verticalAlignment } = attributes;

		const showTemplateSelector = templatePickerAvailable && ! template;

		const onTemplateChange = ( templateIndex ) => {
			if ( templates[ templateIndex ] ) {
				// Update sizes to fit with selected template
				columns.forEach( ( column, index ) => {
					if ( templates[ templateIndex ].template.length > index ) {
						const newAttributes = templates[ templateIndex ].template[ index ][ 1 ];
						updateBlockAttributes( column.clientId, newAttributes );
					}
				} );

				this.setState( {
					template: templates[ templateIndex ].template,
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
				{ ! showTemplateSelector && (
					<Fragment>
						<InspectorControls>
							<PanelBody
								title={ __( 'Change layout', 'wp-bootstrap-blocks' ) }
							>
								<ul className="wp-bootstrap-blocks-template-selector-list">
									{ templates.map( ( template, index ) => ( // eslint-disable-line no-shadow
										<li className="wp-bootstrap-blocks-template-selector-button" key={ index }>
											<IconButton
												label={ template.title }
												icon={ template.icon }
												onClick={ () => {
													setAttributes( {
														isCustomTemplate: false,
													} );
													onTemplateChange( index );
												} }
											>
												<div className="wp-bootstrap-blocks-template-selector-button-label">{ template.title }</div>
											</IconButton>
										</li>
									) ) }
								</ul>
								{ enableCustomTemplate && (
									<Button
										isLink
										onClick={ () => {
											setAttributes( {
												isCustomTemplate: true,
											} );
										} }
									>
										{ __( 'Or use custom layout' ) }
									</Button>
								) }
							</PanelBody>
							<PanelBody
								title={ __( 'Row options', 'wp-bootstrap-blocks' ) }
							>
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
						template={ template }
						templateLock={ getColumnsTemplateLock( isCustomTemplate ) }
						__experimentalTemplateOptions={ templates }
						__experimentalOnSelectTemplateOption={ ( nextTemplate ) => {
							if ( nextTemplate === undefined ) {
								nextTemplate = getColumnsTemplate( customTemplateColumnCount );
								setAttributes( {
									isCustomTemplate: true,
								} );
							}

							this.setState( {
								template: nextTemplate,
							} );
						} }
						__experimentalAllowTemplateOptionSkip={ enableCustomTemplate }
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
		columnCount: columns.length,
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
