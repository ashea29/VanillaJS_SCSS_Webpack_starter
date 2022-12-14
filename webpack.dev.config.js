const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {
  pages,
  entryPoints,
  pluginArray,
  hbsPatialDirs,
} = require("./webpackUtils");

pluginArray.push(new CleanWebpackPlugin());

pages.forEach((page) => {
  entryPoints[page] = `./src/pages/${page}/${page}.module.js`;

  pluginArray.push(
    new HtmlWebpackPlugin({
      filename: page === "home" ? "index.html" : `${page}.html`,
      chunks: [`${page}`],
      title: page,
      template: `src/pages/${page}/${page}.template.hbs`,
      description: `${page} page`,
      minify: false,
    })
  );
});

module.exports = {
  entry: entryPoints,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist/scripts"),
    publicPath: "",
  },
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@src": path.resolve(__dirname, "./src/"),
      "@globalStyles": path.resolve(__dirname, "./src/globalStyles"),
      "@shared": path.resolve(__dirname, "./src/shared"),
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
        use: {
          loader: "handlebars-loader",
          options: {
            partialDirs: hbsPatialDirs,
          },
        },
      },
    ],
  },
  plugins: pluginArray,
};