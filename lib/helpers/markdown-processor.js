const remark = require('remark');
const remarkHtml = require('remark-html');

const processor = remark().use(remarkHtml).process;
module.exports = function markdownProcessor(markdown) {
	return new Promise(resolve => {
		processor(markdown, function(err, html) {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(String(html));
		});
	});
};
