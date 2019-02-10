const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, './dist')},
    module:{
        rules:[{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
            }
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
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
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