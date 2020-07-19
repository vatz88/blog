const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { getAtriclesDirArr } = require('../lib/helpers/articles-helper');

const articleDirs = getAtriclesDirArr();

const pageIdentifierArr = [];

describe('Build articles', () => {
	it.each(articleDirs)('%s should have README.md', dirName => {
		const hasReadme = fs.existsSync(
			path.resolve(__dirname, '..', dirName, 'README.md'),
		);
		expect(hasReadme).toBe(true);
	});

	it.each(articleDirs)(
		'%s README.md should have correct gray-matter data',
		dirName => {
			const readmetext = fs.readFileSync(
				path.resolve(__dirname, '..', dirName, 'README.md'),
			);
			const { content: readme, data: indexjson } = matter(
				readmetext.toString(),
				{
					delims: ['<!--', '-->'],
				},
			);
			expect(readme).toBeTruthy();
			expect(indexjson).toEqual(
				expect.objectContaining({
					title: expect.any(String),
					description: expect.any(String),
					meta: expect.any(Array),
					date: expect.any(String),
					page_identifier: expect.any(String),
				}),
			);
			// page_identifier should never change for article
			expect(indexjson.page_identifier).toMatchSnapshot();
			pageIdentifierArr.push(indexjson.page_identifier);
		},
	);

	it(`should have unique page_identifier for each article page`, () => {
		const uniques = new Set(pageIdentifierArr);
		expect(pageIdentifierArr.length).toBe(uniques.size);
	});
});
