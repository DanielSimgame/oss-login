/**
 * 此文件是Requests的子模块，负责管理用户信息相关API
 * */

import Requests from "."
import {store} from "../store"
import responseHandler from "../Requests/ResponseHandler"

/**
 * @function postLogin
 * @description 发送登录请求
 * @param {FormData} data 登录信息
 * */
export const postLogin = async (data) => {
  const reqUrl = `${store.getters.getApiServer}/auth/oauth2login`
  const res = await Requests.fetchPostLogin(reqUrl, null, data);
  return responseHandler(res)
}

/**
 * @function postSignUp
 * @description 发送注册请求
 * @param {Object} data 注册信息，空字符串填null或者不传
 */
export const postSignUp = async (data) => {
  const reqUrl = `${store.getters.getApiServer}/user/reg`
  const res = await Requests.fetchPostSignUp(reqUrl, null, data);
  return responseHandler(res)
}
// OLD_SIGN_UP_FUNC
// export const postSignUp = async (data) => {
//   const reqUrl = `${store.getters.getApiServer}/user/reg/`
//   const res = await Requests.fetchPost(reqUrl, null, data);
//   return responseHandler(res)
// }

/**
 * @function getUserInfo
 * @description 获取用户信息
 * @param {String} token 用户token
 */
export const getUserInfo = async (token) => {
  const reqUrl = `${store.getters.getApiServer}/user/current?token=${token}/`
  const res = await Requests.fetchGet(reqUrl)
  return responseHandler(res)
}

/**
 * @function postTokenVerify
 * @description 验证用户token合法性
 * @param {String} token 用户token
 */
export const postTokenVerify = async (token) => {
  const reqUrl = `${store.getters.getApiServer}/account/auth`
  const res = await Requests.fetchPost(reqUrl, {Authorization: `Bearer ${token}`})
  return responseHandler(res)
}
