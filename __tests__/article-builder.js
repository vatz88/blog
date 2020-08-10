const path = require('path');
const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);

const { getArticlesDirArr } = require('../lib/utils/articles-helper');
const { buildPage } = require('../lib/utils/article-builder');

const articlesDirArr = getArticlesDirArr();

describe('Article builder', () => {
	it.each(articlesDirArr)(
		'should build correct html for %s',
		async articleDir => {
			const readmeText = (
				await readFile(path.resolve(__dirname, '..', articleDir, 'README.md'))
			).toString();
			const html = await buildPage(readmeText);
			expect(html).toMatchSnapshot();
		},
	);

	it('should build correct html for home page', async () => {
		const readmeText = (
			await readFile(path.resolve(__dirname, '../README.md'))
		).toString();
		const html = await buildPage(readmeText);
		expect(html).toMatchSnapshot();
	});
});
