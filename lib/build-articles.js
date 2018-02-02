const fs = require('fs');
const htmlgenerator = require('./html-generator');
const showdown = require('showdown');
const converter = new showdown.Converter();

const dir = process.argv.slice(2);

if (dir.length === 0) {
    const dirArr = fs.readdirSync('.');
    buildArticlePages(dirArr);
    buildHomePage();
} else if (dir.length === 1 && dir[0] === ".") {
    buildHomePage();
} else {
    buildArticlePages(dir);
}

// build all article pages
function buildArticlePages(dir) {
    "use strict";
    var count = 0;
    dir.forEach(function (el) {
        if (fs.existsSync(el + "/index.json")) {
            var indexjson = fs.readFileSync(el + '/index.json');
            indexjson = JSON.parse(indexjson.toString());
            var readmetext = fs.readFileSync(el + '/README.md');
            var readmehtml = converter.makeHtml(readmetext.toString());
            var html = htmlgenerator(indexjson);
            html = html.toString().split("<!--split-->");
            html = html[0] + readmehtml.toString() + html[1];

            fs.writeFile(el + '/index.html', html, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    count++;
                    console.log(count + ". " + el.toString() + " build");
                }
            });
        }
    });
}

// build home page
function buildHomePage() {
    "use strict";
    var articleArr = [];
    const articleDirArr = fs.readdirSync('.');
    articleDirArr.forEach(function (el) {
        if (fs.existsSync(el + "/index.json")) {
            // el = el.toString().split("-").join(" ");
            articleArr.push(el.toString());
        }
    });
    var readmetext = fs.readFileSync('./README.md');
    readmetext = readmetext.toString().split("<!-- Posts -->");
    var articlesList = (function (arr) {
        var list = "<!-- Posts -->";
        arr.forEach(function (el) {
            list += ("\n" + "- [" + el.split("-").join(" ") + "](/" + el + "/)");
        });
        return list;
    })(articleArr);
    readmetext = readmetext[0] + articlesList;
    var readmehtml = converter.makeHtml(readmetext);
    var indexjson = fs.readFileSync("./index.json");
    indexjson = JSON.parse(indexjson.toString());
    indexjson.articles = articleArr;
    var html = htmlgenerator(indexjson);
    html = html.toString().split("<!--split-->");
    html = html[0] + readmehtml.toString() + html[1];

    fs.writeFile('./README.md', readmetext, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Home page: README.md build");
        }
    });

    fs.writeFile('./index.json', JSON.stringify(indexjson), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Home page: index.json build");
        }
    });

    fs.writeFile('./index.html', html, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Home page: index.html build");
        }
    });
}