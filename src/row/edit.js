import times from 'lodash.times';
import { alignBottom, alignCenter, alignTop } from './icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton, Button, CheckboxControl, PanelBody, SVG, Path } = wp.components;
const { Component, Fragment } = wp.element;
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

const enableCustomTemplate = applyFilters( 'wpBootstrapBlocks.row.enableCustomTemplate', true );
const customTemplateColumnCount = applyFilters( 'wpBootstrapBlocks.row.customTemplateColumnCount', 2 );

const getColumnsTemplateLock = isCustomTemplate => isCustomTemplate ? false : 'all';

export default class BootstrapRowEdit extends Component {
	constructor( props ) {
		super( ...props );
		const count = select( 'core/block-editor' ).getBlockCount( props.clientId );
		this.state = {
			count,
			template: getColumnsTemplate( count ),
			forceUseTemplate: false,
		};
	}

	render() {
		const { className, attributes, setAttributes, clientId } = this.props;
		const { count, template, forceUseTemplate } = this.state;
		const { isCustomTemplate, noGutters, alignment, verticalAlignment } = attributes;

		const showTemplateSelector = ( count === 0 && ! forceUseTemplate ) || ! template;

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

				setAttributes( {
					isCustomTemplate: false,
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
													onTemplateChange( index );
												} }
											/>
										</li>
									) ) }
								</ul>
								{ enableCustomTemplate && (
									<Button
										isLink
										onClick={ () => {
											const customTemplate = getColumnsTemplate( customTemplateColumnCount );
											setAttributes( {
												isCustomTemplate: true,
											} );
											this.setState( { template: customTemplate } );
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
						template={ showTemplateSelector ? null : template }
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
								forceUseTemplate: true,
							} );
						} }
						__experimentalAllowTemplateOptionSkip={ enableCustomTemplate }
						templateLock={ getColumnsTemplateLock( isCustomTemplate ) }
					/>
				</div>
			</Fragment>
		);
	}
}
