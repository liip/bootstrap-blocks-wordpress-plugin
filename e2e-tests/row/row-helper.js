import {
	searchForBlock,
} from '@wordpress/e2e-test-utils';
import {
	selectBlockByName,
} from '../helper';

export const insertRowBlock = async () => {
	await searchForBlock( 'Bootstrap Row' );
	await page.click( 'button.editor-block-list-item-wp-bootstrap-blocks-row' );
};

export const selectRowBlock = async ( index = 0 ) => {
	await selectBlockByName( 'wp-bootstrap-blocks/row', index );
};

export const rowTemplateIsSelected = async ( label ) => {
	return ( await page.$( `.wp-bootstrap-blocks-template-selector-button > button[aria-label="${ label }"].is-active` ) ) !== null;
};

export const oldObjectStructureDeprecationWarning = 'wp-bootstrap-blocks: The old object template structure (<= v1.2.0) of the row block is deprecated, please migrate your templates to the new array structure (v1.3.0+). As soon as you have updated your template structure you need to disable the old object template structure with the wpBootstrapBlocks.row.useOldObjectTemplateStructure filter.';
