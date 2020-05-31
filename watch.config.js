module.exports = function filter(params) {
	return !(
		String(params).endsWith('.html') || String(params).endsWith('.json')
	);
};
