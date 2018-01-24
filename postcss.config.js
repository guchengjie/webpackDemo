module.exports = { 
	parser: 'postcss',   //解析器
	plugins: [
		require('postcss-import')(),   //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
		require('autoprefixer')({
			broswers: ['last 5 versions']
		})
	]
}