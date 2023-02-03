const path = require("path");
const slsw = require("serverless-webpack");
const isLocal = slsw.lib.webpack.isLocal;
const nodeExternals = require("webpack-node-externals");
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
  externals: [
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/smithy-client",
    "@aws-sdk/types"
    // nodeExternals(),
  ],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, ".webpack"),
          ],
        ],
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  // plugins: [new BundleAnalyzerPlugin()],
};
