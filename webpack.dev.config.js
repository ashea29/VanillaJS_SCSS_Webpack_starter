const path = require("path");
const { readdirSync } = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pagesDir = path.resolve(__dirname, "./src/pages");

const getDirectories = (sourceDir) =>
  readdirSync(sourceDir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((dir) => dir.name);

const pages = getDirectories(pagesDir);

const entryPoints = {};
const pluginArray = [];
pluginArray.push(new CleanWebpackPlugin());
// console.log(pluginArray);

pages.forEach((page) => {
  entryPoints[page] = `./src/pages/${page}/${page}.module.js`;

  pluginArray.push(
    new HtmlWebpackPlugin({
      filename: page === "home" ? "index.html" : `${page}.html`,
      chunks: [`${page}`],
      title: page,
      template: "src/pages/base-template.hbs",
      description: `${page} page`,
      minify: false,
    })
  );
});
// console.log("Here is the list of pages: ", pages);
// console.log("Here are the entry points: ", entryPoints);
// console.log(pluginArray);

module.exports = {
  entry: entryPoints,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: pluginArray,
};