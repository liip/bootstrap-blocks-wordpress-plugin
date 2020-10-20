/* global wpBootstrapBlocks */
export const getBootstrapVersion = () => {
	return wpBootstrapBlocks.bootstrapVersion;
};

export const isBootstrap5Active = () => {
	return wpBootstrapBlocks.isBootstrap5Active === '1';
};
