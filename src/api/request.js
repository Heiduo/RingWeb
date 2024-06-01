import axios from 'axios'
import { BASE_API } from '@/api/index'
import { getAppKey, getAppMac, getAppToken, logout } from '@/utils/auth'
import { showNotify } from 'vant'

const mode = import.meta.env.MODE
export const request = axios.create({
  baseURL: mode === 'development' ? '/api/v0' : BASE_API,
})

request.interceptors.request.use(config => {
  config.data = config.data || {}
  const token = getAppToken()
  config.headers.Authorization = 'JWT ' + token
  config.headers.token = token
  config.headers['Content-Type'] = 'application/json'
  Object.assign(config.data, {
    token,
    app_key: config.data.app_key || getAppKey(),
    mac: config.data.mac || getAppMac(),
  })
  return config
})

request.interceptors.response.use(res => {
  const { data: resData, config } = res
  const { status, error_code, data, error_message } = resData
  if (status) return resData
  if (error_code === 'I01A07') {
    logout()
  } else {
    const errorMsg = typeof error_message === 'object' ? JSON.stringify(error_message) : error_message || '请求失败'
    showNotify({ type: 'danger', message: String(errorMsg) })
  }
  return Promise.reject(resData)
})

export function postRequest(config, data) {
  const requestConfig = {
    data,
    method: 'post',
    url: '',
  }
  if (typeof config === 'string') {
    requestConfig.url = config
  } else if (typeof config === 'object') {
    Object.assign(requestConfig, config)
  }
  return request(requestConfig)
}
