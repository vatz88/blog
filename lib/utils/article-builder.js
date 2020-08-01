const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const markdownProcessor = require('./markdown-processor');
const htmlgenerator = require('./html-generator');
const { getAtriclesDirArr } = require('./articles-helper');
const commonIndexjson = require('../helpers/template');

const articlesDirArr = getAtriclesDirArr();

/**
 * Builds single article page
 * @param {string} readmetext - readme
 * @return {Promise<string>} html
 */
async function buildPage(readmetext) {
	const { content: readme, data: indexjson } = matter(readmetext, {
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
	return html;
}

/**
 * Build all article pages.
 * Gennerate html for each article page
 * and write it to its corresponding index.html file.
 */
async function buildAllArticlePages() {
	return Promise.all(
		articlesDirArr.map(async articleDir => {
			const readmetext = (
				await readFile(
					path.resolve(__dirname, '..', '..', articleDir, 'README.md'),
				)
			).toString();

			const html = await buildPage(readmetext);

			await writeFile(
				path.resolve(__dirname, '..', '..', articleDir, 'index.html'),
				html,
			);
			console.log(`✅ ${articleDir.split('-').join(' ')}`);
		}),
	);
}

/**
 * Build home page.
 * Generate HTML from root README.md
 * and write it to the root index.html.
 */
async function buildHomePage() {
	const readmetext = (
		await readFile(path.resolve(__dirname, '..', '..', 'README.md'))
	).toString();

	const html = await buildPage(readmetext);

	await writeFile(path.resolve(__dirname, '..', '..', 'index.html'), html);
	console.log('✅ Home page');
}

module.exports = {
	buildPage,
	buildAllArticlePages,
	buildHomePage,
};
