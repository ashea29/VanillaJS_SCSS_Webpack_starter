const path = require("path");
const { readdirSync } = require("fs");

const pagesDir = path.resolve(__dirname, "./src/pages");

const getDirectories = (sourceDir) =>
  readdirSync(sourceDir, { withFileTypes: true }).filter((item) =>
    item.isDirectory()
  );

const getHbsPartialDirs = (sourceDir) => {
  const componentDirs = [];
  const allComponentPaths = [];

  getDirectories(sourceDir).forEach((page) =>
    componentDirs.push({
      pageName: page.name,
      path: `./src/pages/${page.name}/components`,
    })
  );

  componentDirs.forEach((item) =>
    getDirectories(item.path).forEach((componentDir) =>
      allComponentPaths.push(
        path.resolve(
          __dirname,
          `./src/pages/${item.pageName}/components/${componentDir.name}`
        )
      )
    )
  );

  return allComponentPaths;
};

const pages = getDirectories(pagesDir).map((dir) => dir.name);

const entryPoints = {};
const pluginArray = [];
const hbsPatialDirs = getHbsPartialDirs(pagesDir);

module.exports = {
  pages,
  entryPoints,
  pluginArray,
  hbsPatialDirs,
};