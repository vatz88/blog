const unified = require('unified');
const remarkParse = require('remark-parse');
const externalLinks = require('remark-external-links');
const remark2rehype = require('remark-rehype');
const slug = require('rehype-slug');
const autolinkHeadings = require('rehype-autolink-headings');
const highlight = require('rehype-highlight');
const stringify = require('rehype-stringify');

const processor = unified()
	.use(remarkParse) // Converts markdown to markdown AST
	.use(externalLinks, { target: '_blank', rel: ['noopener'] }) // Adds target _blank and rel noopener to external links
	.use(remark2rehype) // Markdown AST to html AST
	.use(slug) // Adds id attribute to # headers
	.use(autolinkHeadings, { behavior: 'wrap' }) // Wraps headers in anchor tag and links them with id
	.use(highlight) // Code syntax highlighting
	.use(stringify).process; // Html AST to string

/**
 * Takes markdown as string and returns a promise which resolves to give HTML string of the corresponding markdown
 * @param {string} markdown
 * @return {Promise}
 */
function markdownProcessor(markdown) {
	return new Promise(resolve => {
		processor(markdown, function(err, html) {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(html);
		});
	});
}

module.exports = markdownProcessor;
