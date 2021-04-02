/// <reference types="cypress" />

interface CreateNewPostParams {
	postType?: string;
	title?: string;
	content?: string;
	excerpt?: string;
	showWelcomeGuide?: boolean;
}

declare namespace Cypress {
	interface Chainable<Subject> {
		clickBlockToolbarButton(label: string, type?: string): Chainable<void>
		clickElementByText(elementExpression: string, text: string): Chainable<void>
		clickButton(buttonText: string): Chainable<void>
		closeWelcomeGuide(): Chainable<void>
		createNewPost(createNewPostParams?: CreateNewPostParams): Chainable<void>
		insertBlock(searchTerm: string, blockLabel?: string, panelName?: string): Chainable<void>
		loginUser(username?: string, password?: string): Chainable<void>
		openGlobalBlockInserter(): Chainable<void>
		openSidebarPanel(title: string): Chainable<void>
		openSidebarPanelWithTitle(title: string): Chainable<void>
		postContentMatchesSnapshot(): Chainable<void>
		searchForBlock(searchTerm: string): Chainable<void>
		selectBlockByName(name: string, index?: number): Chainable<void>
		visitAdminPage(adminPath: string, query?: string): Chainable<void>
		ensureSidebarOpened(): Chainable<void>
		setPostContent(content: string): Chainable<void>
		toolbarOptionIsActive(toolbarLabel: string, buttonText: string): Chainable<void>
		getInputByLabel(label: string): Chainable<Element>
		getCheckboxByLabel(label: string): Chainable<Element>
		getSelectedOptionBySelectLabel(label: string): Chainable<Element>

		// project commands
		insertRowBlock(): Chainable<void>
		selectRowBlock( index?: number ): Chainable<void>
		rowTemplateIsSelected( label: string ): Chainable<void>
		selectColumnBlock( rowIndex?: number, columnIndex?: number ): Chainable<void>
	}
}
