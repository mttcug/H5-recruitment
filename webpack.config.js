var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helper');
var path = require('path');

module.exports = {
    entry: {
        'app': './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].bundle.[chunkhash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: helpers.root('src', 'index.html')
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                use: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                use: 'raw-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin([helpers.root('dist')],{
            root: process.cwd(),
            verbose: true,
            dry: false
        }),

        new ExtractTextPlugin({filename: 'css/[name].[hash].css'}),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
