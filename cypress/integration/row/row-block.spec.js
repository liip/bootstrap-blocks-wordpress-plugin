/// <reference types="Cypress" />

context( 'Row Block', () => {
	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Row block should be available', () => {
		cy.insertBlock( 'Bootstrap Row', 'Row' );

		// Check if row block was inserted
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]'
		).should( 'exist' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
		).should( 'have.length', 2 );

		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to change alignment', () => {
		cy.insertBlock( 'Bootstrap Row', 'Row' );
		cy.selectBlockByName( 'wp-bootstrap-blocks/row' );

		// Change horizontal alignment
		cy.clickBlockToolbarButton( 'Change horizontal alignment of columns' );
		cy.clickButton( 'Align columns right' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-alignment="right"]'
		).should( 'exist' );
		cy.postContentMatchesSnapshot();

		// Change vertical alignment
		cy.clickBlockToolbarButton( 'Change vertical alignment of columns' );
		cy.clickButton( 'Align columns bottom' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-vertical-alignment="bottom"]'
		).should( 'exist' );
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to change column layout', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Layout options should be visible
		cy.get( '.wp-bootstrap-blocks-template-selector-button' ).should(
			'have.length',
			5
		);
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:1)"].is-active'
		).should( 'not.be.null' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-size-md="6"]'
		).should( 'have.length', 2 );

		// Template should be applied
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="3 Columns (1:1:1)"]'
		).click();
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-size-md="4"]'
		).should( 'have.length', 3 );
		cy.postContentMatchesSnapshot();

		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (2:1)"]'
		).click();
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to select custom template', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Custom template should add block list appender (shouldn't change current layout)
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
		).click();
		cy.get(
			'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
		).should( 'exist' );
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should only be possible to add column in custom layout', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Select custom template
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
		).click();

		// Add column block by clicking the block list appender
		cy.get(
			'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender > button'
		).click();

		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
		).should( 'have.length', 3 );
	} );

	it( 'Should be possible to apply row options', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Enable no gutters option
		cy.clickElementByText( 'label', 'No Gutters' );
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to enable column layout in editor', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Enable editor stack columns
		cy.clickElementByText( 'label', 'Editor: Display columns stacked' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-editor-stack-columns="true"]'
		).should( 'have.length', 1 );
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should not display Bootstrap v5 options', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Horizontal Gutters options should not exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Horizontal Gutters")]'
		).should( 'not.exist' );

		// Vertical Gutters options should not exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Vertical Gutters")]'
		).should( 'not.exist' );
	} );
} );
