const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  return isProd ? {
    entry: './src/Hexagon',
    output: {
      path: path.join(__dirname, 'umd'),
      filename: 'Hexagon.js',
      libraryTarget: 'umd',
      library: 'reactHexagon'
    },
    plugins: new webpack.optimize.OccurrenceOrderPlugin(),
    externals: {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
          include: [path.join(__dirname, 'src')],
          exclude: /node_modules/
        }
      ]
    },
  } : {
    entry: './demo/demo',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'demo')
          ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'demo/index.html'),
      }),
    ],
    devServer: {
      hot: true,
      contentBase: path.join(__dirname, 'demo')
    }
  }
}
