const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const hashCss = crypto.createHash('md4');
const hashJs = crypto.createHash('md4');

const scriptFile = fs.readFileSync(path.resolve(__dirname, '../src/js/script.js'));
const styleFile = fs.readFileSync(path.resolve(__dirname, '../src/css/style.css'));

hashCss.update(scriptFile);
hashJs.update(styleFile);

let styleHash = hashCss.digest('hex');
let scriptHash = hashJs.digest('hex');

module.exports = function(options) {
  'use strict';

  const title = options.title ? `<title>${options.title}</title>` : '';

  let favicon = options.favicon
    ? `<link rel="icon" href="${options.favicon}">`
    : '<link rel="icon" href="../src/media/favicon.png">';

  const lang = options.lang || 'en';

  const dir = options.dir || 'lrt';

  let script = options.articles
    ? [`src/js/script.js?v=${scriptHash}`]
    : [`../src/js/script.js?v=${scriptHash}`];
  if (options.script) {
    options.script.forEach(function(el) {
      script.push(el);
    });
  }
  script = (function(scriptArr) {
    let arr = [];
    scriptArr.forEach(function(el) {
      arr.push('<script src="' + el + '"></script>');
    });
    return arr.join('');
  })(script);

  let css = options.articles
    ? [`src/css/style.css?v=${styleHash}`]
    : [`../src/css/style.css?v=${styleHash}`];
  if (options.css) {
    options.css.forEach(function(el) {
      css.push(el);
    });
  }
  css = (function(cssArr) {
    let arr = [];
    cssArr.forEach(function(el) {
      arr.push('<link rel="stylesheet" href="' + el + '">');
    });
    return arr.join('');
  })(css);

  let meta = options.meta
    ? (function(metaArr) {
        let arr = [];
        metaArr.forEach(function(el) {
          arr.push('<meta name="' + el.name + '" content="' + el.content + '">');
        });
        return arr.join('');
      })(options.meta)
    : '';

  let head = options.head || '';
  head += '<link rel="icon" sizes="192x192" href="/src/media/icon_192x192.png">';

  let body = options.body || '';
  if (options.enableDisqus) {
    const disqus = `<div id="disqus_thread"></div>
        <script>
        var disqus_config = function () {
        this.page.url = "https://blog.vatz88.in/${options.title.split(' ').join('-')}/";
        this.page.identifier = "${options.page_identifier}";
        };
        (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://blog-by-vatsal-joshi.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
        </script>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>`;

    body += disqus;
  }

  // html page header
  const header = `
        <header>
            <a href="/">Home</a>
        </header>`;

  // html page footer
  const footer = `
        <footer>
            © 2018 <a href="https://vatz88.in">Vatsal Joshi</a>
        </footer>`;

  const google_analytics = `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-75111209-4"></script><script>window.dataLayer = window.dataLayer || [];function gtag() {dataLayer.push(arguments)};gtag('js', new Date());gtag('config', 'UA-75111209-4');</script>`;

  const google_cse = `<div id="google_cse">
        <script>
        (function() {
            var cx = '007576440717308588719:bs1nuhcbhra';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        })();
        </script>
        <gcse:search></gcse:search>
        </div>`;

  return `<!doctype html>
        <html lang="en" dir="${dir}">
        <head>
        <meta charset="utf-8">
        ${favicon}
        ${title}
        ${meta}
        ${head}
        ${css}
        </head>
        <body>
        ${google_analytics}
        ${header}
        ${google_cse}
        <main>
        <!--split-->
        </main>
        ${body}
        ${footer}
        ${script}
        </body>
        </html>`;
};
