module.exports = {
	'*': () => 'yarn test --bail',
	'*.js': ['yarn lint'],
	'!(*.min.).{js,json,css,md}': ['prettier --write', 'git add'],
};
