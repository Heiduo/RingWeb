import {optionsRequest, postRequest} from './request'

export const userApi = {
// API_LOGIN: 'sinklib/device/contact/wlist',
//     API_LOGIN: 'user/contract/wlist/get/',
    API_LOGIN: 'devices/contact/wlist',
}

export function request_userLogin(data) {
  return postRequest({
    url: userApi.API_LOGIN,
    data,
  })
}

export function request_userLogin_pre(data) {
    return optionsRequest({
        url: userApi.API_LOGIN,
        data
    })
}
