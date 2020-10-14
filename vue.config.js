/*
 * @Author: your name
 * @Date: 2020-07-30 10:14:38
 * @LastEditTime: 2020-10-10 14:30:31
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \taibao\vue.config.js
 */
const path = require('path')
module.exports = {
	css: {
		loaderOptions: {
			less: { javascriptEnabled: true }
		}
	},
	devServer: {
		publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
		proxy: {
			'/admin': {
				target: 'https://api-test.changchangenglish.com/',   // target表示代理的服务器url
				pathRewrite: {     // pathRewrite表示路径重写，key表示一个正则，value表示别名 
					'^/api': '/admin/'   // 即用 '/api'表示'http://localhost:3000/api'
				}
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'img': path.resolve(__dirname, 'src/assets'),
				'components': path.resolve(__dirname, 'src/components'),
			}
		},
	}
}