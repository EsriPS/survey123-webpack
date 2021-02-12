const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'MyLibrary.js',
    path: path.resolve('../WebpackJS/scripts'),
    library: 'MyLibrary',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  mode: 'production',
};
