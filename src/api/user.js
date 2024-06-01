import { postRequest } from './request'

export const userApi = {
// API_LOGIN: '/entrance/user/login',
    API_LOGIN: '/sinklib/device/contact/wlist',
}

export function request_userLogin(data) {
  return postRequest({
    url: userApi.API_LOGIN,
    data,
  })
}
