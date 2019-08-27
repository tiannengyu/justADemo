const path = require('path');
const merge = require('webpack-merge');
const Visualizer = require('webpack-visualizer-plugin');
const commonConfig = require('./webpack.common.config.js');

const WORKSPACE = path.resolve(__dirname);

const devConfig = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
        path: path.join(WORKSPACE, 'dist/'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        disableHostCheck: true,
        port: 7777
    },
    devtool: 'inline-source-map',
    plugins: [
        new Visualizer({
            filename: './statistics.html'
        }),
    ],
});

module.exports = devConfig;
