const path = require('path');
const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);

const { buildPage } = require('../lib/utils/article-builder');

const articlesDirArr = [
	'Setting-up-Ubuntu-on-Asus-ROG-GL552VW',
	'All-You-Need-To-Know-About-Placements-In-VIT-Vellore',
	'Components-With-Async-Friendly-Event-Handlers',
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
