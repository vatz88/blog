const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const markdownProcessor = require('./markdown-processor');
const htmlGenerator = require('./html-generator');
const { getArticlesDirArr } = require('./articles-helper');
const commonIndexJson = require('../helpers/template');

const articlesDirArr = getArticlesDirArr();

/**
 * Builds single article page
 * @param {string} readmeText - readme
 * @return {Promise<string>} html
 */
async function buildPage(readmeText) {
	const { content: readme, data: indexJson } = matter(readmeText, {
		delims: ['<!--', '-->'],
	});
	const readmeHtml = await markdownProcessor(readme);
	const htmlOptions = {
		...commonIndexJson,
		...indexJson,
		meta: [...commonIndexJson.meta, ...indexJson.meta],
	};
	let html = htmlGenerator(htmlOptions);
	html = html.split('<!--split-->');
	html = html[0] + readmeHtml + html[1];
	return html;
}

/**
 * Build all article pages.
 * Generate html for each article page
 * and write it to its corresponding index.html file.
 */
async function buildAllArticlePages() {
	return Promise.all(
		articlesDirArr.map(async articleDir => {
			const readmeText = (
				await readFile(
					path.resolve(__dirname, '..', '..', articleDir, 'README.md'),
				)
			).toString();

			const html = await buildPage(readmeText);

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
	const readmeText = (
		await readFile(path.resolve(__dirname, '..', '..', 'README.md'))
	).toString();

	const html = await buildPage(readmeText);

	await writeFile(path.resolve(__dirname, '..', '..', 'index.html'), html);
	console.log('✅ Home page');
}

module.exports = {
	buildPage,
	buildAllArticlePages,
	buildHomePage,
};
