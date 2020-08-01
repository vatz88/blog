const fs = require('fs');

/**
 * Returns true if folder is a valid article folder name
 * @param {string} folder
 * @return {boolean}
 */
function filterAtricleDir(folder) {
	const nonArticleDirs = new Set([
		'.git',
		'.vscode',
		'lib',
		'node_modules',
		'static',
		'__tests__',
		'.github',
	]);
	return !nonArticleDirs.has(folder);
}

/**
 * Get list of directory names of articles
 * @return {[string]} Array of directory names of articles
 */
function getAtriclesDirArr() {
	return fs
		.readdirSync('.', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.filter(filterAtricleDir);
}

module.exports = {
	getAtriclesDirArr,
};
