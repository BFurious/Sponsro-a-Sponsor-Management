const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './sponsro.js', // Entry point of your application
    devtool: 'source-map',
    target: 'node',
    resolve: { extensions: ['.ts', '.js', '.json', '.jsx', '.tsx'] },
    stats: "errors-only",
    externals: [nodeExternals()],
    optimization: {
        minimize: true
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',              
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: 'public' },
                { from: 'views', to: 'views' },
            ]
        }),
        new WriteFilePlugin()
    ]
};