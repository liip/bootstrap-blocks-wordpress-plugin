import {
	clickBlockToolbarButton,
	getAllBlocks,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name, index = 0 ) => {
	await selectBlockByClientId(
		( await getBlockByName( name, index ) ).clientId
	);
};

export const getBlockByName = async ( name, index = 0 ) => {
	const blocksByName = ( await getAllBlocks() ).filter( ( block ) => block.name === name );
	return blocksByName[ index ];
};

export const clickElementByText = async ( elementExpression, text ) => {
	const [ element ] = await page.$x( `//${ elementExpression }[contains(text(),"${ text }")]` );
	await element.click();
};

export const selectOption = async ( label, value ) => {
	const [ selectEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
	const selectId = await page.evaluate(
		( el ) => el.id,
		selectEl
	);
	await page.select( `#${ selectId }`, value );
};

export const getDataValuesOfElement = async ( selector, index = 0 ) => {
	const elements = await page.$$( selector );
	const elementAtIndex = elements[ index ];
	return await page.evaluate(
		( elementAtIndex ) => Object.assign( {}, elementAtIndex.dataset ),
		elementAtIndex
	);
};

export const openSidebarPanelWithTitle = async ( title ) => {
	const panel = await page.waitForXPath(
		`//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]`
	);
	await panel.click();
};

export const getInputValueByLabel = async ( label ) => {
	return await page.$eval(
		`input[aria-label="${ label }"]`,
		( input ) => input.value,
	);
};

export const getCheckboxValueByLabel = async ( label ) => {
	const [ inputEl ] = await page.$x( `//label[@class="components-checkbox-control__label"][contains(text(),"${ label }")]/preceding-sibling::span[@class="components-checkbox-control__input-container"]/input` );
	return await page.evaluate(
		( el ) => el.checked,
		inputEl
	);
};

export const getSelectedValueBySelectLabel = async ( label ) => {
	const [ selectEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
	return await page.evaluate(
		( el ) => el.value,
		selectEl
	);
};

export const toolbarOptionIsActive = async ( toolbarLabel, buttonText ) => {
	await clickBlockToolbarButton( toolbarLabel ); // Open toolbar
	const isActive = ( await page.$x( `//button[contains(text(),"${ buttonText }") and contains(@class,"is-active")]` ) ).length === 1;
	await page.keyboard.press( 'Escape' ); // Close toolbar
	return isActive;
};
