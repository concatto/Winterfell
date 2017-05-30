const path = require('path');

module.exports = {
    entry: {
			index: './src/index.js',
			home: './src/home.js'
		},
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name].js'
    },
		module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}