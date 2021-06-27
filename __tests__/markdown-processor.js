const fs = require('fs');
const path = require('path');

const markdownProcessor = require('../lib/utils/markdown-processor');

const placementsMarkdown = fs
	.readFileSync(
		path.resolve(
			__dirname,
			'../all-you-need-to-Know-about-placements-in-vit-vellore/README.md',
		),
	)
	.toString();

const ubuntuMarkdown = fs
	.readFileSync(
		path.resolve(
			__dirname,
			'../setting-up-ubuntu-on-asus-rog-gl552vw/README.md',
		),
	)
	.toString();

const asyncEventHandlersMarkdown = fs
	.readFileSync(
		path.resolve(
			__dirname,
			'../components-with-async-friendly-event-handlers/README.md',
		),
	)
	.toString();

describe('Markdown processor', () => {
	it('should produce same html for a same given markdown', async () => {
		const [
			placementsHtml,
			ubuntuHtml,
			asyncEventHandlersHtml,
		] = await Promise.all([
			markdownProcessor(placementsMarkdown),
			markdownProcessor(ubuntuMarkdown),
			markdownProcessor(asyncEventHandlersMarkdown),
		]);

		expect(placementsHtml).toMatchSnapshot({
			cwd: expect.any(String),
		});

		expect(ubuntuHtml).toMatchSnapshot({
			cwd: expect.any(String),
		});

		expect(asyncEventHandlersHtml).toMatchSnapshot({
			cwd: expect.any(String),
		});
	});
});
