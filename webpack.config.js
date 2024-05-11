
const path = require("path");

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    react: 'react',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        type: 'asset/resource', // Use asset/resource for SVG files
        generator: {
          filename: 'images/[name][ext]', // Output path for the SVG files
        },
      },
      {
        test: /\.css$/, // Target .css files
        use: ['style-loader', 'css-loader'], // Apply these loaders
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
