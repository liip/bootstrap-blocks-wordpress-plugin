/// <reference types="Cypress" />

describe( 'Column Block', () => {
	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Column block should not be available in block inserter', () => {
		// Intercept block directory request
		cy.intercept(
			'/index.php?rest_route=%2Fwp%2Fv2%2Fblock-directory%2Fsearch&term=*',
			{
				body: [],
			}
		);
		cy.searchForBlock( 'Bootstrap Column' );

		const noResultsSelectorPreWP55 =
			'//div[contains(@class,"block-editor-inserter__no-results")]';
		const noResultsSelectorWP55 =
			'//div[contains(@class,"block-editor-inserter__content")]//div[contains(@class,"has-no-results")]';
		const noResultsSelectorWP57 =
			'//p[contains(@class,"block-directory-downloadable-blocks-panel__description") and contains(@class,"has-no-results")]';
		cy.xpath(
			`${ noResultsSelectorPreWP55 } | ${ noResultsSelectorWP55 } | ${ noResultsSelectorWP57 }`
		).should( 'exist' );
	} );

	it( 'Column block should be initialized with default attributes', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Check if default values are set in data attributes
		cy.get( '[data-type="wp-bootstrap-blocks/column"]' )
			.first()
			.should( 'have.attr', 'data-size-xs', '12' )
			.should( 'have.attr', 'data-size-sm', '0' )
			.should( 'have.attr', 'data-size-md', '6' )
			.should( 'have.attr', 'data-size-lg', '0' )
			.should( 'have.attr', 'data-size-xl', '0' );

		// Select first column block
		cy.selectColumnBlock();

		// Check if default values are set in inspector controls
		cy.openSidebarPanelWithTitle( 'Column size' );

		cy.getInputByLabel( 'Xs Column count' ).should( 'have.value', '12' );
		cy.getInputByLabel( 'Sm Column count' ).should( 'have.value', '0' );
		cy.getInputByLabel( 'Md Column count' ).should( 'have.value', '6' );
		cy.getInputByLabel( 'Lg Column count' ).should( 'have.value', '0' );
		cy.getInputByLabel( 'Xl Column count' ).should( 'have.value', '0' );

		cy.getCheckboxByLabel( 'Xs equal-width' ).should( 'not.be.selected' );
		cy.getCheckboxByLabel( 'Sm equal-width' ).should( 'not.be.selected' );
		cy.getCheckboxByLabel( 'Md equal-width' ).should( 'not.be.selected' );
		cy.getCheckboxByLabel( 'Lg equal-width' ).should( 'not.be.selected' );
		cy.getCheckboxByLabel( 'Xl equal-width' ).should( 'not.be.selected' );
	} );

	it( 'Should be possible to change column size', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();

		// Change column size attributes
		cy.openSidebarPanelWithTitle( 'Column size' );
		cy.clickElementByText( 'label', 'Lg equal-width' );

		// Check if default values are set in data attributes
		cy.get( '[data-type="wp-bootstrap-blocks/column"]' )
			.first()
			.should( 'have.attr', 'data-size-xs', '0' )
			.should( 'have.attr', 'data-size-sm', '0' )
			.should( 'have.attr', 'data-size-md', '0' )
			.should( 'have.attr', 'data-size-lg', '0' )
			.should( 'have.attr', 'data-size-xl', '0' );

		cy.getCheckboxByLabel( 'Lg equal-width' ).should( 'be.checked' );

		// Column size should be disabled if equal-width checkbox is checked
		cy.get( 'input[aria-label="Lg Column count"][disabled]' ).should(
			'exist'
		);

		cy.postContentMatchesSnapshot();

		cy.get(
			'input.components-input-control__input[aria-label="Xl Column count"]'
		).type( '2' );
		cy.get( '[data-type="wp-bootstrap-blocks/column"]' )
			.first()
			.should( 'have.attr', 'data-size-xl', '2' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to select background color', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();

		// Select background color
		cy.openSidebarPanelWithTitle( 'Background color' );
		cy.get( 'button[aria-label="Color: secondary"]' ).click();

		// Check if selected background is set in data attribute
		cy.get( '[data-type="wp-bootstrap-blocks/column"]' )
			.first()
			.should( 'have.attr', 'data-bg-color', 'secondary' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to select padding', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();

		// Select padding
		cy.openSidebarPanelWithTitle( 'Padding (inside column)' );
		cy.getSelectByLabel( 'Size' ).select( 'p-2' );
		cy.get( '[data-type="wp-bootstrap-blocks/column"]' )
			.first()
			.should( 'have.attr', 'data-padding', 'p-2' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to change content vertical alignment', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();

		// Change content vertical alignment
		cy.clickBlockToolbarButton( 'Change vertical alignment of content' );
		cy.clickButton( 'Align content bottom' );
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-content-vertical-alignment="bottom"]'
		).should( 'exist' );
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should not display xxl breakpoint options if run with Bootstrap 4', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();
		cy.openSidebarPanelWithTitle( 'Column size' );

		// Xl column count option should exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Xl Column count")]'
		).should( 'exist' );

		// Xxl column count option should not exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Xxl Column count")]'
		).should( 'not.exist' );

		// Xl equal-width option should exist
		cy.xpath(
			'//label[contains(@class,"components-checkbox-control__label")][contains(text(),"Xl equal-width")]'
		).should( 'exist' );

		// Xxl equal-width option should not exist
		cy.xpath(
			'//label[contains(@class,"components-checkbox-control__label")][contains(text(),"Xxl equal-width")]'
		).should( 'not.exist' );
	} );
} );
