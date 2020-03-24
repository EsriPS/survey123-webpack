const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'MyLibrary.js',
    path: path.resolve('../WebpackJS/extensions'),
    library: "MyLibrary",
    libraryTarget: "var",
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  mode: "dev",
};
