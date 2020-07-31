const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const markdownProcessor = require('./markdown-processor');
const htmlgenerator = require('./html-generator');
const { getAtriclesDirArr } = require('./articles-helper');
const commonIndexjson = require('../helpers/template');

const articlesDirArr = getAtriclesDirArr();

/**
 * build all article pages
 * @param {[]} dir
 */
function buildArticlePages(dir = articlesDirArr) {
	let count = 0;
	dir.forEach(async function(el) {
		const readmetext = fs.readFileSync(
			path.resolve(__dirname, '..', '..', el, 'README.md'),
		);
		const { content: readme, data: indexjson } = matter(readmetext.toString(), {
			delims: ['<!--', '-->'],
		});
		const readmehtml = await markdownProcessor(readme);
		const htmlOptions = {
			...commonIndexjson,
			...indexjson,
			meta: [...commonIndexjson.meta, ...indexjson.meta],
		};
		let html = htmlgenerator(htmlOptions);
		html = html.split('<!--split-->');
		html = html[0] + readmehtml + html[1];

		fs.writeFile(
			path.resolve(__dirname, '..', '..', el, 'index.html'),
			html,
			function(err) {
				if (err) {
					console.log(err);
				} else {
					count++;
					console.log(`${count}. ${el.toString()} build`);
				}
			},
		);
	});
}

/**
 * build home page
 * @param {[]} [articlesArr] - Array of directory names of articles
 */
async function buildHomePage(articlesArr = articlesDirArr) {
	// TODO
	// readmetext = readmetext.toString().split('<!-- Posts -->');
	// const articlesList = (function(arr) {
	// 	let list = '<!-- Posts -->';
	// 	arr.forEach(function(el) {
	// 		list += `\n- [${el.split('-').join(' ')}](/${el}/)<em></em>`;
	// 	});
	// 	return list;
	// })(articlesArr);
	// readmetext = readmetext[0] + articlesList;
	// const readmehtml = converter.makeHtml(readmetext.toString());
	const readmetext = fs.readFileSync(
		path.resolve(__dirname, '..', '..', 'README.md'),
	);
	const { content: readme, data: indexjson } = matter(readmetext.toString(), {
		delims: ['<!--', '-->'],
	});
	const readmehtml = await markdownProcessor(readme);
	indexjson.articles = articlesArr;
	const htmlOptions = {
		...commonIndexjson,
		...indexjson,
		meta: [...commonIndexjson.meta, ...indexjson.meta],
	};
	let html = htmlgenerator(htmlOptions);
	html = html.split('<!--split-->');
	html = html[0] + readmehtml + html[1];

	// fs.writeFile(path.resolve(__dirname, '..', '..', 'README.md'), readmetext, function(
	// 	err,
	// ) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log('Home page: README.md build');
	// 	}
	// });

	fs.writeFile(
		path.resolve(__dirname, '..', '..', 'index.html'),
		html,
		function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Home page: index.html build');
			}
		},
	);
}

module.exports = {
	buildArticlePages,
	buildHomePage,
};
