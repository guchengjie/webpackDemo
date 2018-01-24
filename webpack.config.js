const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		main: './src/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),   //现在这里只能填写绝对路径
		filename: 'js/[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
				exclude: path.resolve(__dirname, 'node-modules')
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 }},   //使用@import导入的样式模块数
					{ loader: 'postcss-loader' }
				],
				// loader: 'style-loader!css-loader!postcss-loader',    执行顺序从右到左,或从下到上
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.html$/,         //.html结尾的模板解析
				loader: 'html-loader'
			},
			// {
			// 	test: /\.(png|jpg|svg|gif)$/i,
			// 	loader: 'file-loader',            //可以处理css和html里引入的文件
			// 	query: {
			// 		name: 'assets/[name]-[hash:5].[ext]'
			// 	}
			// },
			{
				test: /\.(png|jpg|svg|gif)$/i,
				loader: 'url-loader',           //可以对满足要求的文件进行处理（base64）
				query: {
					limit: '5000',         //小于5kb的图片进行base64压缩,不然会造成源代码增大
					name: 'assets/[name]-[hash:5].[ext]'
				}
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{ loader: 'css-loader' },   //使用@import导入的样式模块数
					{ loader: 'postcss-loader' },
					'less-loader'
				],
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					'style-loader',
					{ loader: 'css-loader' },   //使用@import导入的样式模块数
					{ loader: 'postcss-loader' },
					'sass-loader'
				],
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.temp.html',
			inject: 'body',
			title: 'wo is a new html',   //向html模板传参
		})

	]
}