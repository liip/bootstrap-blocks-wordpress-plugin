export const openSidebarPanelWithTitle = async (
	editor,
	page,
	title: string
) => {
	await page
		.getByRole( 'region', {
			name: 'Editor settings',
		} )
		.getByRole( 'button', { name: title } )
		.click();
};
