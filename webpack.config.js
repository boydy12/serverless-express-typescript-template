const path = require("path");
const slsw = require("serverless-webpack");
const isLocal = slsw.lib.webpack.isLocal;
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: isLocal ? "development" : "production",
  devtool: isLocal ? "eval-cheap-source-map" : false,
  entry: slsw.lib.entries,
  target: "node",
  resolve: {
    extensions: [".mjs", ".ts", ".js"],
  },
  externals: ["@aws-sdk/client-dynamodb", "@aws-sdk/lib-dynamodb"],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  // plugins: [new BundleAnalyzerPlugin()],
};