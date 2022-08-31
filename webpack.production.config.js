const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const { pages, entryPoints, pluginArray } = require("./webpackUtils");

pluginArray.push(
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
  })
);
pluginArray.push(new CleanWebpackPlugin());

pages.forEach((page) => {
  entryPoints[page] = `./src/pages/${page}/${page}.module.js`;

  pluginArray.push(
    new HtmlWebpackPlugin({
      filename: page === "home" ? "index.html" : `${page}.html`,
      chunks: [`${page}`],
      title: page,
      template: `src/pages/${page}/${page}.template.html`,
      description: `${page} page`,
      minify: true,
    })
  );
});

module.exports = {
  entry: entryPoints,
  output: {
    filename: "scripts/[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "production",
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 3000,
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
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
      //   {
      //     test: /\.hbs$/,
      //     use: {
      //       loader: "handlebars-loader",
      //       options: {
      //         partialDirs: hbsPatialDirs,
      //       },
      //     },
      //   },
    ],
  },
  plugins: pluginArray,
};