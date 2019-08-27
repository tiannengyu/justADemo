
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');


const devConfig = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
 
    ],
});

module.exports = devConfig;
