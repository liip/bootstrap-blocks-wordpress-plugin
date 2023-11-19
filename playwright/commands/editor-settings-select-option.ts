export const editorSettingsSelectOption = async (
	editor,
	page,
	label: string,
	option: string
) => {
	await editor.openDocumentSettingsSidebar();
	await page
		.getByRole( 'region', {
			name: 'Editor settings',
		} )
		.getByLabel( label )
		.selectOption( option );
};
