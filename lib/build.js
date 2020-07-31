const { buildArticlePages, buildHomePage } = require('./utils/article-builder');

const dir = process.argv.slice(2);
if (dir.length === 0) {
	buildArticlePages();
	buildHomePage();
} else if (dir.length === 1 && dir[0] === '.') {
	buildHomePage();
} else {
	buildArticlePages(dir);
}
