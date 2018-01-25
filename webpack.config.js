const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
	filename: path.join('css','[name]-[contenthash:5].css'),
	allChunks: true
});
const extractLESS = new ExtractTextPlugin({
	filename: path.join('css','[name]-[contenthash:5].css'),
	allChunks: true
});
const extractSASS = new ExtractTextPlugin({
	filename: path.join('css','[name]-[contenthash:5].css'),
	allChunks: true
});

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		main: './src/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),   //现在这里只能填写绝对路径
		filename: 'js/[name].bundle.js',
		publicPath: '/'           //开发环境publicPath设置为‘/’或在开发是‘http://localhost:8000/’.有利于解决ExtractTextPlugin输出文件路径的图片路径问题
	},
	devServer: {
	    contentBase: path.join(__dirname, "dist"),      	//本地服务器所加载的页面所在的目录
	    historyApiFallback: false,			//不跳转
	    inline: true,					//实时刷新
	    port: '8000', 				//服务器端口号
	    hot: true     					//热更新
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
				use: extractCSS.extract({              //把样式表独立出来,在外部引入样式
					use: [ 
						{ loader: 'css-loader', options: { importLoaders: 1 }},   //使用@import导入的样式模块数
						{ loader: 'postcss-loader' }
					],
					fallback: 'style-loader'   // 在开发环境使用 style-loader
				}),
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
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader',           //可以对满足要求的文件进行处理（base64）
				query: {
					limit: '5000',         //小于5kb的图片进行base64压缩,不然会造成源代码增大
					name: 'assets/[name]-[hash:5].[ext]'
				}
			},
			{
				test: /\.less$/,
				use: extractLESS.extract({
					use: [
						{ loader: 'css-loader' },   //使用@import导入的样式模块数
						{ loader: 'postcss-loader' },
						'less-loader'
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(scss|sass)$/,
				use: extractSASS.extract({
					use: [
						{ loader: 'css-loader' },   //使用@import导入的样式模块数
						{ loader: 'postcss-loader' },
						'sass-loader'
					],
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),    //为每个 chunk(模块) 文件头部添加 banner
		new webpack.HotModuleReplacementPlugin(),  			//热加载插件
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.temp.html',
			inject: 'body',
			title: 'wo is a new html',   //向html模板传参
		}),
		new CleanWebpackPlugin('dist/*.*', {   //清除打包的历史文件
	      root: __dirname,
	      verbose: true,
	      dry: false
	    }),
	    extractCSS,
	    extractSASS,
	    extractLESS
	]
}