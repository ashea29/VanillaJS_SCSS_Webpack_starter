const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    home: "./src/pages/home/home.module.js",
  },
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
      //   {
      //     test: /\.css$/,
      //     use: [MiniCssExtractPlugin.loader, "css-loader"],
      //   },
      //   {
      //     test: /\.scss$/,
      //     use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      //   },
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
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "[name].[contenthash].css",
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["home"],
      title: "Home",
      template: "src/pages/base-template.hbs",
      description: "Home page",
      minify: false,
    }),
    // new HtmlWebpackPlugin({
    //     filename: 'kiwi.html',
    //     chunks: ['kiwi'],
    //     title: 'Kiwi',
    //     template: 'src/page-template.hbs',
    //     description: 'Kiwi',
    //     minify: false
    // })
  ],
};