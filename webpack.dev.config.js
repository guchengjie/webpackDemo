const path = require('path');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist/js'),   //现在这里只能填写绝对路径
		filename: 'bundle.js'
	}
}