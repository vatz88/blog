# Usage

## build-articles

To build all articles and home page

    npm start

To only build all articles

    npm start *

To only build home page

    npm start .

To build specific article page

    npm start [article directory names]

## html-generator

Generate HTML by passing HTML data in JSON format.

### Example

JSON

```js
{
    "title": "This Is A Example",
    "favicon": "media/favicon.png", // set by default
    "head": "<script>console.log('Can put anything here')</script>",
    "lang": "en", // set by default
    "dir" : "ltr", // set by default
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
```
