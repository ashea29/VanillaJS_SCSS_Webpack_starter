const path = require("path");
const { readdirSync } = require("fs");

const pagesDir = path.resolve(__dirname, "./src/pages");

const getDirectories = (sourceDir) =>
  readdirSync(sourceDir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((dir) => dir.name);

const getHbsPartialDirs = (sourceDir) => {
  const componentDirs = [];
  const allComponentPaths = [];

  readdirSync(sourceDir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((page) =>
      componentDirs.push({
        pageName: page.name,
        path: `./src/pages/${page.name}/components`,
      })
    );

  componentDirs.forEach((item) => {
    readdirSync(item.path, { withFileTypes: true })
      .filter((subItem) => subItem.isDirectory())
      .map((componentDir) =>
        allComponentPaths.push(
          path.resolve(
            __dirname,
            `./src/pages/${item.pageName}/components/${componentDir.name}`
          )
        )
      );
  });

  return allComponentPaths;
};

const pages = getDirectories(pagesDir);

const entryPoints = {};
const pluginArray = [];
const hbsPatialDirs = getHbsPartialDirs(pagesDir);

module.exports = {
  pagesDir,
  getDirectories,
  getHbsPartialDirs,
  pages,
  entryPoints,
  pluginArray,
  hbsPatialDirs,
};