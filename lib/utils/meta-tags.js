const { SITE_DOMAIN } = require('../helpers/constants');

const titleMetaTags = [
	'twitter:title',
	'og:title',
	'twitter:image:alt',
	'og:site_name',
];
const descriptionMetaTags = ['twitter:description', 'og:description'];

/**
 * @param {string} title
 * @param {string} description
 * @param {[name, property, content]} additionalMetaTags - Pass either name or property
 * @param {boolean} isHomePage
 * @return {string} - HTML string for meta tag attributes
 */
function getMetaTags(
	title,
	description,
	additionalMetaTags = [],
	isHomePage = false,
) {
	const arr = [];
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
		const path = title.replace(/\s/g, '-').toLowerCase();
		const ogUrlMetaTag = `<meta property="og:url" content="https://${SITE_DOMAIN}/${path}/">`;
		const twUrlMetaTag = `<meta property="twitter:url" content="https://${SITE_DOMAIN}/${path}/">`;
		const ogImageMetaTag = `<meta property="og:image" content="https://${SITE_DOMAIN}/${path}/meta-image.png">`;
		const twImageMetaTag = `<meta property="twitter:image" content="https://${SITE_DOMAIN}/${path}/meta-image.png">`;
		arr.push(ogUrlMetaTag, twUrlMetaTag, ogImageMetaTag, twImageMetaTag);
	} else {
		const ogImageMetaTag = `<meta property="og:image" content="https://${SITE_DOMAIN}/static/media/icon_1200x628.jpg">`;
		const twImageMetaTag = `<meta property="twitter:image" content="https://${SITE_DOMAIN}/static/media/icon_1200x628.jpg">`;
		arr.push(ogImageMetaTag, twImageMetaTag);
	}

	return arr.join('');
}

module.exports = getMetaTags;
