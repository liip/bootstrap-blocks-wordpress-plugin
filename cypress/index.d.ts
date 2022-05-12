/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {

		getByCy(cyKey: string): Chainable<Element>;
		postContentMatchesSnapshot(): Chainable<void>
		insertRowBlock(): Chainable<void>
		selectRowBlock( index?: number ): Chainable<void>
		rowTemplateIsSelected( label: string ): Chainable<void>
		selectColumnBlock( rowIndex?: number, columnIndex?: number ): Chainable<void>
		insertButtonBlock(): Chainable<void>
		selectButtonBlock( index?: number ): Chainable<void>
		insertContainerBlock(): Chainable<void>
		selectContainerBlock( index?: number ): Chainable<void>

	}
}
