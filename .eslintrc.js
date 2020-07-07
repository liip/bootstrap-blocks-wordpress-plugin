module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	overrides: [
		{
			// Use jest/recommended plugin for our e2e-test helpers.
			// In @wordpress/eslint-plugin/recommended there are the following patterns which do that '**/specs/**/*.js', '**/?(*.)spec.js' which ignore these files.
			files: [ 'e2e-tests/**/*.js' ],
			extends: [ 'plugin:jest/recommended' ],
			env: {
				browser: true,
			},
			globals: {
				browser: 'readonly',
				page: 'readonly',
				wp: 'readonly',
			},
		},
	],
};
