module.exports = {
	root: true,
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:cypress/recommended',
	],
	rules: {
		'jest/expect-expect': [
			'error',
			{ assertFunctionNames: [ 'expect', 'cy' ] },
		],
	},
};
