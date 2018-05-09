const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	},
  	devtool: 'source-map',
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
	   		title: 'Lisbon Cycle',
	   		template: 'src/index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	],
	module: {
		//noParse: /(mapbox-gl)\.js$/,
		rules: [
			{
		        test: /\.js$/,
		        exclude: /node_modules/,
		        use: {
		          loader: "babel-loader"
		        }
		    },
		    {
            test: /\.scss$/,
	            use: [
	                "style-loader", // creates style nodes from JS strings
	                "css-loader", // translates CSS into CommonJS
	                "sass-loader" // compiles Sass to CSS
	            ]
	        },
			{
				test: /\.css$/,
				use: [
			   		{
			   			loader: 'style-loader'
			   		},
			   		{
			   			loader: 'css-loader',
			   			options: {
			              //modules: true,
			              //importLoaders: 1,
			              //localIdentName: "[name]_[local]_[hash:base64]",
			              //sourceMap: true,
			              //minimize: true
			            }
			   		}
			 	]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
		         test: /\.(woff|woff2|eot|ttf|otf)$/,
		         use: [
		           'file-loader'
		         ]
		    },
		    {
		         test: /\.(csv|tsv)$/,
		         use: [
		           'csv-loader'
		         ]
	       },
	       {
		         test: /\.xml$/,
		         use: [
		           'xml-loader'
		         ]
	       }
		]
	}
};