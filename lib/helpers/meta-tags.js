const titleMetaTags = [
  "twitter:title",
  "twitter:image:alt",
  "og:title",
  "og:site_name"
];
const descriptionMetaTags = [
  "description",
  "twitter:description",
  "og:description"
];

module.exports = function(title, description, additionalMetaTags = []) {
  let arr = [];
  titleMetaTags.forEach(function(name) {
    arr.push(`<meta name="${name}" content="${title}">`);
  });
  descriptionMetaTags.forEach(function(name) {
    arr.push(`<meta name="${name}" content="${description}">`);
  });

  additionalMetaTags.forEach(function(el) {
    arr.push(`<meta name="${el.name}" content="${el.content}">`);
  });

  const ogUrlMetaTag = `<meta name="og:url" content="${title.replace(
    /\s/g,
    "-"
  )}">`;
  arr.push(ogUrlMetaTag);

  return arr.join("");
};
