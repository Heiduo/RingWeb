import { postRequest } from './request'

export const paymentApi = {
  API_PAYMENT_WX_QRCODE: 'report/evaluation/speciality/wx/pay/native',
  API_PAYMENT_ALI_QRCODE: 'report/evaluation/speciality/ali/pay/native',
  API_PAYMENT_REPORT_ORDER_STATUS: 'report/evaluation/speciality/order/commit',
  API_PAYMENT_ORDER_STATUS: 'report/evaluation/speciality/order/details',
}

export function request_wxPaymentQrcode(data) {
  return postRequest({
    url: paymentApi.API_PAYMENT_WX_QRCODE,
    data,
  })
}

export function request_aliPaymentQrcode(data) {
  return postRequest({
    url: paymentApi.API_PAYMENT_ALI_QRCODE,
    data,
  })
}


export function request_getReportOrderStatus(data) {
  return postRequest({
    url: paymentApi.API_PAYMENT_REPORT_ORDER_STATUS,
    data,
  })
}


export function request_getOrderStatus(data) {
  return postRequest({
    url: paymentApi.API_PAYMENT_ORDER_STATUS,
    data,
  })
}

