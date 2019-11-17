import {
	getAllBlocks,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name ) => {
	await selectBlockByClientId(
		( await getBlockByName( name ) ).clientId
	);
};

export const getBlockByName = async ( name ) => {
	return ( await getAllBlocks() ).find( ( block ) => block.name === name );
}

export const clickElementByText = async ( elementExpression, text ) => {
	const [ element ] = await page.$x( `//${ elementExpression }[contains(text(),"${ text }")]` );
	await element.click();
};

export const getDataValuesOfElement = async ( selector ) => {
	return await page.$eval(
		selector,
		element => Object.assign( {}, element.dataset )
	);
}

export const openSidebarPanelWithTitle = async ( title ) => {
	const panel = await page.waitForXPath(
		`//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]`
	);
	await panel.click();
};

export const getInputValueByLabel = async ( label ) => {
	return await page.$eval(
		`input[aria-label="${ label }"]`,
		input => input.value,
	);
};

export const getCheckboxValueByLabel = async ( label ) => {
	const inputEl = ( await page.$x( `//label[@class="components-checkbox-control__label"][contains(text(),"${ label }")]/preceding-sibling::span[@class="components-checkbox-control__input-container"]/input` ) )[ 0 ];
	return await page.evaluate(
		el => el.checked,
		inputEl
	);
}
