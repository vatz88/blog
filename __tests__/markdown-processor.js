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

const asyncEventHandlersMarkdown = fs
	.readFileSync(
		path.resolve(
			__dirname,
			'../Components-With-Async-Friendly-Event-Handlers/README.md',
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
