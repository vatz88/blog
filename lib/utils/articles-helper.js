const fs = require('fs');
const { NON_ARTICLE_DIRECTORIES } = require('../helpers/constants');

/**
 * Returns true if folder is a valid article folder name
 * @param {string} folder
 * @return {boolean}
 */
function filterArticleDir(folder) {
	return !NON_ARTICLE_DIRECTORIES.includes(folder);
}

/**
 * Get list of directory names of articles
 * @return {[string]} Array of directory names of articles
 */
function getArticlesDirArr() {
	return fs
		.readdirSync('.', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.filter(filterArticleDir);
}

module.exports = {
	getArticlesDirArr,
};
