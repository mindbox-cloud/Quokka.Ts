var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",

  entry: ["./src/index.ts"],

  output: {
    filename: "index.js",
    libraryTarget: "umd",
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },

      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        include: [
          // antlr4ts targets es2015 and we want our library to target es5
          path.resolve(__dirname, "node_modules/antlr4ts"),
        ],
      },
    ],
  },

  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
