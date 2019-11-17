import {
	getAllBlocks,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name ) => {
	await selectBlockByClientId( getBlockByName( name ).clientId );
};

export const getBlockByName = async ( name ) => {
	return ( await getAllBlocks() ).find( ( block ) => block.name === name );
}

export const clickElementByText = async ( type, text ) => {
	const [ element ] = await page.$x( `//${ type }[contains(., '${ text }')]` );
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

export const getRangeSelectorValueByLabel = async ( label ) => {
	const inputEl = ( await page.$x( `//label[@class="components-base-control__label"][contains(., "${ label }")]/following-sibling::input[@class="components-range-control__number"]` ) )[ 0 ];
	return await page.evaluate(
		el => el.value,
		inputEl
	);
}
