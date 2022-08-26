module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: [ require.resolve( '@wordpress/babel-preset-default' ) ],
		},
	},
	overrides: [
		{
			// Use cypress/recommended plugin for cypress tests.
			files: [ 'cypress/**/*.js' ],
			extends: [ 'plugin:cypress/recommended' ],
		},
	],
};
