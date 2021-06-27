const path = require('path');
const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);

const { buildPage } = require('../lib/utils/article-builder');

const articlesDirArr = [
	'setting-up-ubuntu-on-asus-rog-gl552vw',
	'all-you-need-to-Know-about-placements-in-vit-vellore',
	'components-with-async-friendly-event-handlers',
];

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
