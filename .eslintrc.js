module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	overrides: [
		{
			// Use cypress/recommended plugin for cypress tests.
			files: [ 'cypress/**/*.js' ],
			extends: [ 'plugin:cypress/recommended' ],
			rules: {
				'jest/expect-expect': [
					'error',
					{ assertFunctionNames: [ 'expect', 'cy' ] },
				],
			},
		},
	],
};
