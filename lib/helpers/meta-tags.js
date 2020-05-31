const constants = require('../constants');

const titleMetaTags = [
	'twitter:title',
	'og:title',
	'twitter:image:alt',
	'og:site_name',
];
const descriptionMetaTags = ['twitter:description', 'og:description'];

module.exports = function getMetaTags(
	title,
	description,
	additionalMetaTags = [],
	isHomePage = false,
) {
	let arr = [];
	titleMetaTags.forEach(function(name) {
		arr.push(`<meta property="${name}" content="${title}">`);
	});
	descriptionMetaTags.forEach(function(name) {
		arr.push(`<meta property="${name}" content="${description}">`);
	});
	arr.push(`<meta name="title" content="${title}">`);
	arr.push(`<meta name="description" content="${description}">`);

	additionalMetaTags.forEach(function(el) {
		if (el.name) {
			arr.push(`<meta name="${el.name}" content="${el.content}">`);
		} else if (el.property) {
			arr.push(`<meta property="${el.property}" content="${el.content}">`);
		}
	});

	if (!isHomePage) {
		const path = title.replace(/\s/g, '-');
		const ogUrlMetaTag = `<meta property="og:url" content="https://${constants.site_domain}/${path}/">`;
		const twUrlMetaTag = `<meta property="twitter:url" content="https://${constants.site_domain}/${path}/">`;
		arr.push(ogUrlMetaTag, twUrlMetaTag);
	}

	return arr.join('');
};
