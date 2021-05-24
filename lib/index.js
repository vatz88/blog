const {
	buildAllArticlePages,
	buildHomePage,
} = require('./utils/article-builder');

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
console.log('\x1b[36m%s\x1b[0m', 'Building...');

buildAllArticlePages();
buildHomePage();
