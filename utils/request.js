import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '~/store'
import { getToken } from '~/utils/auth'

// import router from "~/router"

// create an axios instance
const service = axios.create({
  withCredentials: true,
  timeout: 5000,
  headers: {
    Accept: 'application/json, text/plain, */*; charset=utf-8',
    "Content-Type": "application/json;charset=utf-8"
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken() || ""
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.Header.ResultType !== 1) {
      Message({
        message: res.msg || '接口出现错误！',
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.msg || 'error'))
      // return (res || 'error')

    } else {

      return res
    }
  },
  error => {
    console.debug(error);
    // debugger
    const code = error.response.status || ""; //错误返回状态码
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，请重新登录',
        '温馨提示', {
        confirmButtonText: '重新登录',
        showClose: false,
        showCancelButton: false,
        type: 'warning'
      }
      ).then(() => {

        // store.dispatch('user/resetToken').then(() => {
        //   location.reload() // 为了重新实例化vue-router对象 避免bug
        // })
      })

      return error.response.data

    } else if (code === 403) {
      // router.push({
      //   path: '/401'
      // })
    } else {
      Message({
        message: error.response.data.Message || "网络请求出现错误，请重试！",
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
    }
    return Promise.reject(error.response.data)
  }
)

function api(url, method = 'get', param) {
  return new Promise((resolve, reject) => {
    service({
      method: method,
      url,
      data: param,
      responseType: 'json',
      params: method === 'post' ? null : param
    })
      .then(res => {
        if (res.code === 200) {
          return resolve(res)
        }
      })
      .catch(error => {
        // throw error
        return reject(error)
        // if (beforError && typeof(beforError) === 'function')
        // reject(error)
      })
  })
}

export default {
  getAxios() {
    return service
  },
  baseApi(url, method, param) {
    return api(url, method, param)
  },
  // get请求
  get(url, param) {
    for (var key in param) {
      let str = param[key]
      if (typeof str === 'string') {
        str = str.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
        param[key] = str
      }
    }
    return api(url, 'get', param)
  },
  // post请求
  post(url, param) {
    return api(url, 'post', param)
  },
  // patch请求
  patch(url, param) {
    return api(url, 'patch', param)
  },
  // put请求
  put(url, param) {
    return api(url, 'put', param)
  },
  // delete请求
  delete(url, param) {
    return api(url, 'delete', param)
  },
  service
}
