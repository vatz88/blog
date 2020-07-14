const unified = require('unified');
const remarkParse = require('remark-parse');
const slug = require('rehype-slug');
const autolinkHeadings = require('rehype-autolink-headings');
const remark2rehype = require('remark-rehype');
const stringify = require('rehype-stringify');
const sanitize = require('rehype-sanitize');

const processor = unified()
	.use(remarkParse)
	.use(remark2rehype)
	.use(slug)
	.use(autolinkHeadings, { behavior: 'wrap' })
	.use(sanitize)
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
