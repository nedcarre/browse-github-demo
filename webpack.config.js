'use strict';

var webpack = require('webpack');
var path = require('path');

var definePlugin = new webpack.DefinePlugin({
    "global.GENTLY": false ,
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

module.exports = {
    node: {
        __dirname: true
    },
    entry: './components/scripts/main.jsx',
    output: {
        path: './build/development',
        filename: (process.env.BUILD_DEV ? 'bundle.js' : 'bundle.min.js'),
        publicPath: (process.env.BUILD_DEV ? 'http://localhost:8090/assets' : '')
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
            {test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded&' +
                      "includePaths[]=" +
                         encodeURIComponent(path.resolve(__dirname, "./node_modules/susy/sass")) + "&" +
                      "includePaths[]=" +
                        encodeURIComponent(path.resolve(__dirname, "./node_modules/compass-mixins/lib")) + "&" +
                      "includePaths[]=" +
                        encodeURIComponent(path.resolve(__dirname, "./node_modules/compass-mixins/lib/compass/reset")) + "&" +
                      "includePaths[]=" +
                        encodeURIComponent(path.resolve(__dirname, "./node_modules/compass-mixins/lib/compass/css3")) + "&" +
                      "includePaths[]=" +
                        encodeURIComponent(path.resolve(__dirname, "./components/sass")) + "&" +
                      "includePaths[]=" +
                        encodeURIComponent(path.resolve(__dirname, "./components/sass/modules"))},
            {test: /\.(png|svg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.(jpg|gif)$/, loader: 'file-loader'}

        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [definePlugin]
}