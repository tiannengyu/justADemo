const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TsconfigPathsPlugin=require('tsconfig-paths-webpack-plugin')
const miniCssExtractPlugin=require('mini-css-extract-plugin')

const WORKSPACE = path.resolve(__dirname);

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
    console.log('此为开发环境');
} else {
    console.log('此为生产环境');
}

const commonConfig = {
    entry: {
        entry: './src/index.js',
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.join(WORKSPACE, 'dist/'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=babel'],
            },
            {
                test: /\.s[ac]ss$/,
                include: path.join(WORKSPACE, 'src'),
                use: [
                    miniCssExtractPlugin.loader, 
                    {
                        loader:'typings-for-css-modules-loader',
                        options:{
                            modules:true,
                            namedExport:true,
                            camelCase:true,
                            sass:true,
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            includePaths:[path.join(WORKSPACE,'src/styles')]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader',
                ]
            }
        ],

    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','.jsx'],
        plugins:[
            new TsconfigPathsPlugin({
                configFile:path.join(WORKSPACE,'tsconfig.json')
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new miniCssExtractPlugin({
            filename:'./dist/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'aneng Blog',
            template: './src/index.template.html',
            minify: {
                removeComments: true, // 去注释
                collapseWhitespace: true, // 压缩空格
                removeAttributeQuotes: true // 去除属性引用
            }
        }),
        new AddAssetHtmlPlugin([
            { filepath: path.join(WORKSPACE, '/dll/*.dll.js'), },
        ]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.join(WORKSPACE, 'dll/vendor-manifest.json')
        }),
        new HappyPack({
            // 用id来标识 happypack处理那里类文件
            id: 'babel',
            // 如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: ['@babel/transform-runtime']
                },
            }],
            // 共享进程池
            threadPool: happyThreadPool,
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = commonConfig;
