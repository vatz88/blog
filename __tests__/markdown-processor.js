const fs = require('fs');
const path = require('path');

const markdownProcessor = require('../lib/utils/markdown-processor');

const placementsMarkdown = fs
	.readFileSync(
		path.resolve(
			__dirname,
			'../All-You-Need-To-Know-About-Placements-In-VIT-Vellore/README.md',
		),
	)
	.toString();

const ubuntuMarkdown = fs
	.readFileSync(
		path.resolve(
			__dirname,
			'../Setting-up-Ubuntu-on-Asus-ROG-GL552VW/README.md',
		),
	)
	.toString();

describe('Markdown processor', () => {
	it('should produce same html for a same given markdown', async () => {
		const placementsHtml = await markdownProcessor(placementsMarkdown);
		expect(placementsHtml).toMatchSnapshot({
			cwd: expect.any(String),
		});
		const ubuntuHtml = await markdownProcessor(ubuntuMarkdown);
		expect(ubuntuHtml).toMatchSnapshot({
			cwd: expect.any(String),
		});
	});
});
