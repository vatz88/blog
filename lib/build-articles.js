const fs = require('fs');
const path = require('path');
const markdownProcessor = require('./helpers/markdown-processor');
const htmlgenerator = require('./html-generator');

let commonIndexjson = fs.readFileSync(
	path.resolve(__dirname, './template.json'),
);
commonIndexjson = JSON.parse(commonIndexjson);

const dir = process.argv.slice(2);
if (dir.length === 0) {
	const dirArr = fs.readdirSync('.');
	buildArticlePages(dirArr);
	buildHomePage();
} else if (dir.length === 1 && dir[0] === '.') {
	buildHomePage();
} else {
	buildArticlePages(dir);
}

/**
 * build all article pages
 * @param {[]} dir
 */
function buildArticlePages(dir) {
	let count = 0;
	dir.forEach(async function(el) {
		const indexPath = path.resolve(__dirname, '..', el, 'index.json');
		if (fs.existsSync(indexPath)) {
			let indexjson = fs.readFileSync(indexPath);
			indexjson = JSON.parse(indexjson.toString());
			const htmlOptions = {
				...commonIndexjson,
				...indexjson,
				meta: [...commonIndexjson.meta, ...indexjson.meta],
			};
			const readmetext = fs.readFileSync(
				path.resolve(__dirname, '..', el, 'README.md'),
			);
			const readmehtml = await markdownProcessor(readmetext.toString());
			let html = htmlgenerator(htmlOptions);
			html = html.toString().split('<!--split-->');
			html = html[0] + readmehtml.toString() + html[1];

			fs.writeFile(
				path.resolve(__dirname, '..', el, 'index.html'),
				html,
				function(err) {
					if (err) {
						console.log(err);
					} else {
						count++;
						console.log(`${count}. ${el.toString()} build`);
					}
				},
			);
		}
	});
}

/**
 * build home page
 */
async function buildHomePage() {
	const articleArr = [];
	const articleDirArr = fs.readdirSync(path.resolve(__dirname, '..'));
	articleDirArr.forEach(function(el) {
		if (fs.existsSync(path.resolve(__dirname, '..', el, 'index.json'))) {
			// el = el.toString().split("-").join(" ");
			articleArr.push(el.toString());
		}
	});
	const readmetext = fs.readFileSync(
		path.resolve(__dirname, '..', 'README.md'),
	);
	// TODO
	// readmetext = readmetext.toString().split('<!-- Posts -->');
	// const articlesList = (function(arr) {
	// 	let list = '<!-- Posts -->';
	// 	arr.forEach(function(el) {
	// 		list += `\n- [${el.split('-').join(' ')}](/${el}/)<em></em>`;
	// 	});
	// 	return list;
	// })(articleArr);
	// readmetext = readmetext[0] + articlesList;
	// const readmehtml = converter.makeHtml(readmetext.toString());
	const readmehtml = await markdownProcessor(readmetext.toString());
	let indexjson = fs.readFileSync(path.resolve(__dirname, '..', 'index.json'));
	indexjson = JSON.parse(indexjson.toString());
	indexjson.articles = articleArr;
	const htmlOptions = {
		...commonIndexjson,
		...indexjson,
		meta: [...commonIndexjson.meta, ...indexjson.meta],
	};
	let html = htmlgenerator(htmlOptions);
	html = html.toString().split('<!--split-->');
	html = html[0] + readmehtml.toString() + html[1];

	// fs.writeFile(path.resolve(__dirname, '..', 'README.md'), readmetext, function(
	// 	err,
	// ) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log('Home page: README.md build');
	// 	}
	// });

	fs.writeFile(path.resolve(__dirname, '..', 'index.html'), html, function(
		err,
	) {
		if (err) {
			console.log(err);
		} else {
			console.log('Home page: index.html build');
		}
	});
}
