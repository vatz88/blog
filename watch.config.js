module.exports = function filter(params) {
	return !(
		String(params).endsWith('.html') ||
		String(params).endsWith('.json') ||
		String(params).includes('node_modules') ||
		String(params).includes('yarn.lock')
	);
};
