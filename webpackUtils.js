const path = require("path");
const { readdirSync } = require("fs");

const pagesDir = path.resolve(__dirname, "./src/pages");
// const sharedDir = path.resolve(__dirname, "./src/shared")

const getDirectories = (sourceDir) =>
  readdirSync(sourceDir, { withFileTypes: true }).filter((item) =>
    item.isDirectory()
  );

// const getHbsPartialDirs = () => {
//   const pageComponentDirs = [];
//   const sharedComponentDirs = [];
//   const allComponentPaths = [];

//   getDirectories(pagesDir).forEach((page) =>
//     pageComponentDirs.push({
//       pageName: page.name,
//       path: `./src/pages/${page.name}/components`,
//     })
//   );

//   getDirectories(sharedDir).forEach((dir) =>
//     sharedComponentDirs.push({
//       sharedDirName: dir.name,
//       path: `./src/shared/${dir.name}`,
//     })
//   );

//   pageComponentDirs.forEach((item) => {
//     const componentArray = getDirectories(item.path)
//       if (componentArray.length !== 0) {
//         componentArray.forEach((componentDir) =>
//         allComponentPaths.push(
//           path.resolve(
//             __dirname,
//             `./src/pages/${item.pageName}/components/${componentDir.name}`
//           )
//         )
//        )
//       }
//     }
//   );

//   if (sharedComponentDirs.length !== 0) {
//     sharedComponentDirs.forEach((item) => {
//       allComponentPaths.push(
//         path.resolve(
//           __dirname,
//           item.path
//         )
//       )

//     });
//   }

//   return allComponentPaths;
// };

const pages = getDirectories(pagesDir).map((dir) => dir.name);

const entryPoints = {};
const pluginArray = [];
// const hbsPatialDirs = getHbsPartialDirs();

module.exports = {
  pages,
  entryPoints,
  pluginArray,
  // hbsPatialDirs,
};