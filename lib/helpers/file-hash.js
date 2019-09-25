const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const hashCss = crypto.createHash("md4");
const hashJs = crypto.createHash("md4");

const scriptFile = fs.readFileSync(
  path.resolve(__dirname, "../../static/js/script.js")
);
const styleFile = fs.readFileSync(
  path.resolve(__dirname, "../../static/css/style.css")
);

hashCss.update(styleFile);
hashJs.update(scriptFile);

const styleHash = hashCss.digest("hex");
const scriptHash = hashJs.digest("hex");

module.exports = {
  styleHash,
  scriptHash
};
