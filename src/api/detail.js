/*
 * @Author: your name
 * @Date: 2020-08-11 16:57:36
 * @LastEditTime: 2020-08-11 17:04:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \taibaoc:\Users\Lenovo\Desktop\taibao111\src\api\index.js
 */
import request from './http.js'
import api from '@/request'
export const letMenu = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/getElementTree',
    data
  })
}
export const seek = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/getColumnCondition',
    data
  })
}

export const addTitle = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/saveTitle',
    data
  })
}
export const getList = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/getColumnCondition',
    data
  })
}
// 查询菜单列表
export const findList = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/findVisibleTitleList',
    data
  })
}
// 下载
export const downLoad = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/exportReport',
    data,
    responseType: 'blob'
  })
}

// 查询数据
export const getData = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/findCustomizeReport',
    // url: api.title + 'detailReport/findByPageCustomizeReport',
    data
  })
}
//更新表头
export const updateTitle = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/updateTitle',
    data
  })
}
// 查询数据
export const getTitleByName = (data) => {
  return request({
    method: 'post',
    url: api.title + 'detailReport/getTitleByName',
    data
  })
}
// 获取tree
export const getTreeList = (params) => {
  return request({
    method: 'post',
    url: api.title + 'dgx/data/get/organizationProvider!query.do',
    params
  })
}

