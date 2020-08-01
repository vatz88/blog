module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: ['google', 'plugin:prettier/recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 11,
	},
	rules: {
		'prefer-template': 'warn',
		'no-undef': 'error',
	},
	overrides: [
		{
			files: ['**/__tests__/*.js'],
			globals: {
				describe: true,
				expect: true,
				it: true,
			},
		},
	],
	// remove "static/js" when we have a build process for js files served to browser
	ignorePatterns: ['*.min.js', 'node_modules', 'static/js'],
};
