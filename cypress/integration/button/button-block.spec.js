/// <reference types="Cypress" />

const NEW_TAB_REL_DEFAULT_VALUE = 'noreferrer noopener';

describe( 'Button Block', () => {
	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Button block should be initialized with default attributes', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to set link url and text', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();

		// Set button text
		cy.get(
			'[aria-label="Add text..."].block-editor-rich-text__editable'
		).type( 'Liip' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();

		// Set button url
		cy.get( 'input[aria-label="URL"]' ).type( 'https://liip.ch' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to select style', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		// Style option should be applied
		cy.getSelectByLabel( 'Style' ).select( 'secondary' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to change alignment', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();

		// Change alignment
		cy.clickBlockToolbarButton( 'Change button alignment' );
		cy.clickButton( 'Align text center' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/button"][data-alignment="center"]'
		).should( 'exist' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to enable and disable open in new tab', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		// Enable open in new tab
		cy.clickElementByText( 'label', 'Open in new tab' );

		// Check if default rel value is set
		cy.getTextControlByLabel( 'Link rel' ).should(
			'have.value',
			NEW_TAB_REL_DEFAULT_VALUE
		);

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();

		// Disable open in new tab
		cy.clickElementByText( 'label', 'Open in new tab' );

		// Check if default rel value is removed
		cy.getTextControlByLabel( 'Link rel' ).should( 'have.value', '' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should keep rel value if set when open in new tab is enabled or disabled', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		const customRelValue = 'custom rel value';

		// Enable no gutters option
		cy.setTextControlValueByLabel( 'Link rel', customRelValue );

		// Enable open in new tab
		cy.clickElementByText( 'label', 'Open in new tab' );

		// Check if rel value hasn't changed
		cy.getTextControlByLabel( 'Link rel' ).should(
			'have.value',
			customRelValue
		);

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();

		// Disable open in new tab
		cy.clickElementByText( 'label', 'Open in new tab' );

		// Check if rel value hasn't changed
		cy.getTextControlByLabel( 'Link rel' ).should(
			'have.value',
			customRelValue
		);

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );
} );
