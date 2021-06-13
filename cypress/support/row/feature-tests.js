export const testVersion100RowFeatures = () => {
	// Select 1. Row
	cy.selectRowBlock( 0 );

	// 2:1 template should be selected
	cy.rowTemplateIsSelected( '2 Columns (2:1)' );

	// No Gutters option should be checked
	cy.getCheckboxByLabel( 'No Gutters' ).should( 'be.checked' );

	// Select 2. Row
	cy.selectRowBlock( 1 );

	// Align columns right should be selected
	cy.toolbarOptionIsActive(
		'Change horizontal alignment of columns',
		'Align columns right'
	);

	// Align columns bottom should be selected
	cy.toolbarOptionIsActive(
		'Change vertical alignment of columns',
		'Align columns bottom'
	);

	// Align full should be selected
	cy.toolbarOptionIsActive( 'Align', 'Full width' );
};

export const testVersion110RowFeatures = () => {
	// Select 3. Row
	cy.selectRowBlock( 2 );

	// Custom template should be selected
	cy.rowTemplateIsSelected( 'Custom' );
	// Column block appender should be visible
	cy.get(
		'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
	).should( 'exist' );
};

export const testVersion100ColumnFeatures = () => {
	// Select 2. Column of 1. Row
	cy.selectColumnBlock( 0, 1 );

	// Check if default values are set in inspector controls
	cy.openSidebarPanelWithTitle( 'Column size' );
	cy.getInputByLabel( 'Xs Column count' ).should( 'have.value', '5' );
	cy.getInputByLabel( 'Sm Column count' ).should( 'have.value', '6' );
	cy.getInputByLabel( 'Md Column count' ).should( 'have.value', '7' );
	cy.getInputByLabel( 'Lg Column count' ).should( 'have.value', '8' );
	cy.getInputByLabel( 'Xl Column count' ).should( 'have.value', '9' );
};

export const testVersion110ColumnFeatures = async () => {
	// Select 2. Column of 1. Row
	cy.selectColumnBlock( 0, 1 );

	// Background color should be selected
	cy.openSidebarPanelWithTitle( 'Background color' );

	// There is no way to see which color of a color palette is selected. That's why we check the data attribute value of the second column block.
	cy.get(
		'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
	)
		.eq( 1 )
		.should( 'have.attr', 'data-bg-color', 'primary' );

	// Check if center content option was migrated to content vertical alignment
	cy.toolbarOptionIsActive(
		'Change vertical alignment of content',
		'Align content center'
	);

	// Padding should be selected
	cy.openSidebarPanelWithTitle( 'Padding (inside column)' );
	cy.getSelectByLabel( 'Size' ).should( 'have.value', 'p-5' );
};

export const testVersion140ColumnFeatures = () => {
	// Select 2. Column of 1. Row
	cy.selectColumnBlock( 0, 1 );

	// Column equal-width checkboxes should be checked
	cy.openSidebarPanelWithTitle( 'Column size' );
	cy.getCheckboxByLabel( 'Lg equal-width' ).should( 'be.checked' );
	cy.getCheckboxByLabel( 'Xl equal-width' ).should( 'be.checked' );
};
