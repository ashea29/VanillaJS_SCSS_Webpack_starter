const path = require("path");
const { readdirSync } = require("fs");

const pagesDir = path.resolve(__dirname, "./src/pages");

const getDirectories = (sourceDir) =>
  readdirSync(sourceDir, { withFileTypes: true }).filter((item) =>
    item.isDirectory()
  );

const pages = getDirectories(pagesDir).map((dir) => dir.name);

const entryPoints = {};
const pluginArray = [];

module.exports = {
  pages,
  entryPoints,
  pluginArray,
};