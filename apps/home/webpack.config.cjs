const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = {
  entry: path.resolve(__dirname, 'src', 'main.tsx'),
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto'
  },
  devServer: {
    port: 3001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: { loader: 'ts-loader', options: { transpileOnly: true } }, exclude: /node_modules/ },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx'
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: deps.react, strictVersion: false },
        'react-dom': { singleton: true, eager: false, requiredVersion: deps['react-dom'], strictVersion: false },
        '@mui/material': { singleton: true, eager: false, requiredVersion: deps['@mui/material'], strictVersion: false },
        '@emotion/react': { singleton: true, eager: false, requiredVersion: deps['@emotion/react'], strictVersion: false },
        '@emotion/styled': { singleton: true, eager: false, requiredVersion: deps['@emotion/styled'], strictVersion: false },
        '@emotion/cache': { singleton: true, eager: false, requiredVersion: deps['@emotion/cache'], strictVersion: false },
        'i18next': { singleton: true, eager: false, requiredVersion: deps['i18next'], strictVersion: false },
        'react-i18next': { singleton: true, eager: false, requiredVersion: deps['react-i18next'], strictVersion: false },
        '@rtl-monorepo/ui-core': { singleton: true, eager: false }
      }
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ]
}
