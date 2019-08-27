const webpack = require('webpack');
const path = require('path');

const WORKSPACE = path.resolve(__dirname);

const lib = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
];

const dllConfig = {
    mode: 'production',
    entry: {
        'vendor': lib
    },
    output: {
        path: path.join(WORKSPACE, 'dll'),
        filename: '[name].dll.js',
        library: '[name]_library',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(WORKSPACE, 'dll', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
    ]
};


module.exports = dllConfig;
