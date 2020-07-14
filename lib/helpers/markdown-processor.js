const unified = require('unified');
const remarkParse = require('remark-parse');
const remark2rehype = require('remark-rehype');
const slug = require('rehype-slug');
const autolinkHeadings = require('rehype-autolink-headings');
const highlight = require('rehype-highlight');
const stringify = require('rehype-stringify');

const processor = unified()
	.use(remarkParse)
	.use(remark2rehype)
	.use(slug)
	.use(autolinkHeadings, { behavior: 'wrap' })
	.use(highlight)
	.use(stringify).process;
module.exports = function markdownProcessor(markdown) {
	return new Promise(resolve => {
		processor(markdown, function(err, html) {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(html);
		});
	});
};
