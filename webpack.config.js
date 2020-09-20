const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    // the output bundle won't be optimized for production but suitable for development
    mode: 'development',
    devtool: envKeys.NODE_ENV === 'development' && 'source-map',
    // the app entry point is /src/index.js
    entry: [
      path.resolve(__dirname, 'src', 'index.js'),
      path.resolve(__dirname, 'src', 'assets/styles/index.scss'),
    ],
    output: {
      // the output of the webpack build will be in /dist directory
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          // for any file with a suffix of js or jsx
          test: /\.jsx?$/,
          // ignore transpiling JavaScript from node_modules as it should be that state
          exclude: /node_modules/,
          // use the babel-loader for transpiling JavaScript to a suitable format
          loader: 'babel-loader',
          options: {
            // attach the presets to the loader (most projects use .babelrc file instead)
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // fallback to style-loader in development
            process.env.NODE_ENV !== 'production'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    // add a custom index.html as the template
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new webpack.DefinePlugin(envKeys),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        screens: path.resolve(__dirname, 'src/screens/'),
        routes: path.resolve(__dirname, 'src/routes/'),
        services: path.resolve(__dirname, 'src/services/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        store: path.resolve(__dirname, 'src/store.js'),
      },
    },
  }
}
