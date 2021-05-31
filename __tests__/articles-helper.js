const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { getArticlesDirArr } = require('../lib/utils/articles-helper');

const articleDirs = getArticlesDirArr();

const pageIdentifierArr = [];

describe('Build articles', () => {
	it.each(articleDirs)('%s should have README.md', dirName => {
		const hasReadme = fs.existsSync(
			path.resolve(__dirname, '..', dirName, 'README.md'),
		);
		expect(hasReadme).toBe(true);
	});

	it.each(articleDirs)('%s should have meta image', dirName => {
		const hasMetaImage = fs.existsSync(
			path.resolve(__dirname, '..', dirName, 'meta-image.png'),
		);
		expect(hasMetaImage).toBe(true);
	});

	it.each(articleDirs)(
		'%s README.md should have correct gray-matter data',
		dirName => {
			const readmeText = fs.readFileSync(
				path.resolve(__dirname, '..', dirName, 'README.md'),
			);
			const { content: readme, data: indexJson } = matter(
				readmeText.toString(),
				{
					delims: ['<!--', '-->'],
				},
			);
			expect(readme).toBeTruthy();
			expect(indexJson).toEqual(
				expect.objectContaining({
					title: expect.any(String),
					description: expect.any(String),
					meta: expect.any(Array),
					date: expect.any(String),
					page_identifier: expect.any(String),
				}),
			);
			// page_identifier should never change for article
			expect(indexJson.page_identifier).toMatchSnapshot();
			pageIdentifierArr.push(indexJson.page_identifier);
		},
	);

	it(`should have unique page_identifier for each article page`, () => {
		const uniques = new Set(pageIdentifierArr);
		expect(pageIdentifierArr.length).toBe(uniques.size);
	});
});
