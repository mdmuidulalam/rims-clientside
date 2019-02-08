const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, './dist')},
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.less$/,
            use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: "[local]___[hash:base64:5]"
                }
            },
            {
                loader: "less-loader"
            }]
        }]
    },
    plugins:[
        new HWP(
            {template: path.join(__dirname,'./public/index.html')}
        )
    ],
    devServer: {
        historyApiFallback: true,
    }
}