import {
	getAllBlocks,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name ) => {
	await selectBlockByClientId(
		( await getAllBlocks() ).find( ( block ) => block.name === name ).clientId
	);
};

export const clickElementByText = async ( type, text ) => {
	const [ element ] = await page.$x( `//${ type }[contains(., '${ text }')]` );
	await element.click();
};
