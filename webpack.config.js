/**
 * Webpack configuration
 *
 * @author Codex Team
 * @copyright Khaydarov Murod
 */
'use strict';

module.exports = (env, argv) => {
  const path = require('path');
  const pkg = require('./package.json');

  /**
   * Environment
   *
   * @type {any}
   */
  const NODE_ENV = argv.mode || 'development';
  const VERSION = process.env.VERSION || pkg.version;

  /**
   * Plugins for bundle
   *
   * @type {webpack}
   */
  const webpack = require('webpack');


    return  {
    entry: [ './src/index.js' ],
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
            {
                loader: 'babel-loader',
                query: {
                presets: [ '@babel/preset-env' ],
                },
            },
	    'eslint-loader?fix=true'
            ]
        },
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                plugins: [
                    require('postcss-nested-ancestors'),
                    require('postcss-nested')
                ]
                }
            }
            ]
        },
 	{
            test: /\.svg$/,
            loader: 'svg-inline-loader?removeSVGTagAttrs=false'
        }
       ]
    },
     plugins: [
      /** Pass variables into modules */
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        VERSION: JSON.stringify(VERSION),
      }),

      new webpack.BannerPlugin({
        banner: `Warning tool\n\n@version ${VERSION}\n\n@package https://github.com/editor-js/warning\n@licence MIT\n@author CodeX <https://codex.so>`,
      }),
     ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        library: 'Warning',
        libraryTarget: 'umd',
        libraryExport: 'default' // BEWARE this line was ommitted by me and create me no output,no error https://github.com/webpack/webpack/issues/3929
    }
  };
};
