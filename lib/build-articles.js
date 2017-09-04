const fs = require('fs');
const htmlgenerator = require('./html-generator');
const showdown = require('showdown');
const converter = new showdown.Converter();

// const dir = process.argv[2];
const dir = process.argv.slice(2);

// if (dir) {
//     try {
//         var indexjson = fs.readFileSync(dir + '/index.json');
//         indexjson = JSON.parse(indexjson.toString());
//         var readmetext = fs.readFileSync(dir + '/README.md');
//         var readmehtml = converter.makeHtml(readmetext.toString());
//         var html = htmlgenerator(indexjson);
//         html = html.toString().split("<!--split-->");
//         html = [html[0], readmehtml.toString(), html[1]];
//         html = html.join("");


//         fs.writeFile(dir + '/index.html', html, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("Article file for " + dir + " created.");
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// } else {
//     try {
//         var count = 0;
//         var dirArr = fs.readdirSync('.');
//         dirArr.forEach(function (dirEl) {
//             if (dirEl.indexOf(".") === -1 && dirEl !== "src" && dirEl !== "lib" && dirEl !== "CNAME" && dirEl !== "node_modules") {
//                 var indexjson = fs.readFileSync(dirEl + '/index.json');
//                 indexjson = JSON.parse(indexjson.toString());
//                 var readmetext = fs.readFileSync(dirEl + '/README.md');
//                 var readmehtml = converter.makeHtml(readmetext.toString());
//                 var html = htmlgenerator(indexjson);
//                 html = html.toString().split("<!--split-->");
//                 html = [html[0], readmehtml.toString(), html[1]];
//                 html = html.join("");

//                 fs.writeFile(dirEl + '/index.html', html, function (err) {
//                     if (err) {
//                         count--;
//                         console.log(err);
//                     } else {
//                         count++;
//                     }
//                 });
//             }
//         });
//         console.log("Number of article files created: " + count);
//     } catch (err) {
//         console.log(err);
//     }
// }

////////////////////////////////////////
if (dir.length === 0) {
    const dirArr = fs.readdirSync('.');
    buildArticlePages(dirArr);
    buildHomeHTML();
} else if (dir.length === 1 && dir[0] === ".") {
    buildHomeHTML();
} else {
    buildArticlePages(dir);
}

// build all article pages
function buildArticlePages(dir) {
    var count = 0;
    dir.forEach(function (el) {
        if (fs.existsSync(el + "/index.json")) {
            var indexjson = fs.readFileSync(el + '/index.json');
            indexjson = JSON.parse(indexjson.toString());
            var readmetext = fs.readFileSync(el + '/README.md');
            var readmehtml = converter.makeHtml(readmetext.toString());
            var html = htmlgenerator(indexjson);
            html = html.toString().split("<!--split-->");
            html = html[0] + '<main>' + readmehtml.toString() + '</main>' + html[1];

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

// build home page index.html
function buildHomeHTML() {
    var articleArr = [];
    const articleDirArr = fs.readdirSync('.');
    articleDirArr.forEach(function (el) {
        if (fs.existsSync(el + "/index.json")) {
            articleArr.push(el.toString());
        }
    });
    var readmetext = fs.readFileSync('./README.md');
    readmetext = readmetext.toString().split("<!-- List of all articles -->");
    var articlesList = (function (arr) {
        var list = "<!-- List of all articles -->";
        arr.forEach(function (el) {
            list += ("\n" + "- [" + el + "](/" + el + "/)");
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
            console.log("README.md build");
        }
    });

    fs.writeFile('./index.json', JSON.stringify(indexjson), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("index.json build");
        }
    });

    fs.writeFile('./index.html', html, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("index.html build");
        }
    });
}