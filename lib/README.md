# build-articles

To build all articles and home page

`npm start`

To only build all articles

`npm start *`

To only build home page

`npm start .`

To build specific article page

`npm start [article directory names]`

# html-generator

Generate HTML by passing HTML data in JSON format.

_Https redirect and Google analytics is included in all pages_

## Example

**JSON**

    {
        "title": "This Is A Example",
        "favicon": "media/favicon.png", // set by default
        "head": "<script>console.log('Can put anything here')</script>",
        "lang": "en", // set by default
        "dir" : "ltr", // set by default
        "manifest": "../src/appcache.manifest", // only for home page
        "meta":
        [
            {
                "name": "viewport",
                "content": "width=device-width, initial-scale=1"
            },
            {
                "name": "description",
                "content": "This is the site description"
            }
        ],
        "css": ["css/style.css"], // order is important | ../src/css/style.js is always included
        "body": "<h1>Site Heading</h1>",
        "script": ["js/script.js"], // order is important | ../src/js/script.js is always included
        "enableDisqus": false
    }

**Generated HTML**

    <!doctype html>
    <html lang="en" dir="ltr" manifest="${options.manifest}">

    <head>
        <script>
            if (window.location.protocol === "http:" && window.location.hostname !== "localhost") {
                window.location.protocol = "https";
            }
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-75111209-4"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments)
            };
            gtag('js', new Date());
            gtag('config', 'UA-75111209-4');
        </script>
        <meta charset="utf-8">
        <link rel="icon" href="media/favicon.png">
        <title>This Is A Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="This is the site description">
        <script>
            console.log('Can put anything here')
        </script>
        <link rel="icon" sizes="192x192" href="..src/media/icon_192x192.png">
        <link rel="stylesheet" href="../src/css/style.css">
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <header>
            <a href="/">Home</a>
        </header>
        <main>
        <h1>Site Heading</h1>
        </main>
        <footer>
            © 2017 <a href="https://vatz88.in">Vatsal Joshi</a>
        </footer>
        <script src="../src/js/script.js"></script>
        <script src="js/script.js"></script>
    </body>

    </html>