module.exports = {
	'*': () => 'yarn test --bail --onlyChanged',
	'*.js': ['yarn lint'],
	'!(*.min.).{js,json,css,md}': ['prettier --write', 'git add'],
};
