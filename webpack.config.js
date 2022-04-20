const path = require('path');

module.exports = {
  entry: './public/app/index.js',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=[name].[ext]"}
    ]
  },
  resolve: {
    extensions: ['.js', '.json'] 
  }
}
