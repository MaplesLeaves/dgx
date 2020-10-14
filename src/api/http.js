/*
 * @Author: your name
 * @Date: 2020-07-01 17:22:46
 * @LastEditTime: 2020-08-11 17:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \drainage\src\api\index.ts
 */
import axios from 'axios'
import request from '@/request'
import cookie from 'vue-cookie'
import { Message, MessageBox } from 'element-ui'
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: request.api,
  timeout: 0 // request timeout

})
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['Authorization'] = request.cookie + (cookie.get('dgx_access_token') || '')
  config.headers['Content-Type'] = 'application/json; application/octet-stream'
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})
// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.error(res)
    // if (res.code !== 200) {
    //   if (res.code === 401) {
    //     Modal.error({
    //       title: '提示',
    //       content: '您的token已过期，请重新登录',
    //       onOk()  { // 点击确定进行回调
    //       }
    //     });
    //   }else{
    //     message.error(res.msg); // 当业务出现其他错误类型时进行错误弹窗提示
    //   }
    //   return Promise.reject('error')
    // } else { // 当返回值为200 时进行数据抛出 

    // }
    return res
  },
  error => {
    console.error(error.msg)
    Message.error(error.msg); // 当业务出现其他错误类型时进行错误弹窗提示
    return Promise.reject(error)
  })
export default service