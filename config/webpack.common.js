const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const babelConfig = require("./.babelrc.js");

module.exports = {
  context: path.resolve(__dirname, "..", "src"),
  entry: "./js/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: "babel-loader", options: babelConfig }, "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./index.html" }),
    new CopyPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
};
