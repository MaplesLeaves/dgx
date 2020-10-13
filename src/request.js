/*
 * @Author: your name
 * @Date: 2020-08-05 11:22:53
 * @LastEditTime: 2020-08-11 17:08:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taibao\src\request.js
 */
let request = {
  title: 'cubeReport/',
  api: 'http://10.191.192.30:31002/',
  cookie: ''
}
let name = process.env.VUE_APP_NODE_ENV || process.env.NODE_ENV
switch (name) {
  case 'development':
    request.title = 'cubeReport/'
    break;
  case 'test':
    request.title = ''
    request.cookie = ''
    request.api = ''
    break;
  case 'production':
    request.title = 'router/report/'
    request.cookie = 'Bearer '
    request.api = ''
    break;
  default:

}
export default request