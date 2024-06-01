import {getAppMac, setAppMac} from "@/utils/auth.js";

export function app_connectDevice() {
  try {
    if (window.reportApp) {
      return window.reportApp.connectDevice()
    } else {
      window.webkit.messageHandlers.connectDevice.postMessage('')
    }
  } catch (e) {
    console.log(e)
  }
}

export function app_disconnectWatch() {
  try {
    if (window.reportApp) {
      return window.reportApp.disconnectWatch()
    } else {
      window.webkit.messageHandlers.disconnectWatch.postMessage('')
    }
  } catch (e) {
    console.log(e)
  }
}

export function app_setMeasureStatus(status) {
  try {
    if (window.reportApp) {
      window.reportApp.setMeasureStatus(status)
    } else {
      window.webkit.messageHandlers.setMeasureStatus.postMessage(status + '')
    }
  } catch (e) {
    console.log(e)
  }
}

const getDeviceStatusCbs = []
window.pushDeviceStatus = (res) => {
  let info = {}
  try {
    info = JSON.parse(res)
  } catch (e) { /* empty */ }
  getDeviceStatusCbs.forEach(cb => cb(info))
  getDeviceStatusCbs.length = 0
}
export function app_getDeviceStatus(mac) {
  try {
    let deviceCode =  getQueryString('mac');
    if(deviceCode!=null){
      setAppMac(deviceCode)
    }else {
      deviceCode = getAppMac();
    }
    let result = JSON.parse('{"mac":"'+deviceCode+'"}')
    console.log(result)
    return result

  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}

export function getQueryString(name){
  var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i');
  console.log(window.location)
  var r = window.location.search.substr(1).match(reg);
  if(r!=null){
    return unescape(r[2]);
  }
  return null;
}

const showMeasureStatusCbs = []
window.pushMeasureStatus = (res) => {
  let info = {}
  try {
    info = JSON.parse(res)
  } catch (e) { /* empty */ }
  showMeasureStatusCbs.forEach(cb => cb(info))
  showMeasureStatusCbs.length = 0
}
export function app_showMeasureStatus() {
  try {
    if (window.reportApp) {
      let result = window.reportApp.showMeasureStatus()
      try {
        result = JSON.parse(window.reportApp.showMeasureStatus())
      } catch (e) { /* empty */ }
      return Promise.resolve(result)
    } else {
      const promise = new Promise(resolve => {
        showMeasureStatusCbs.push(resolve)
      })
      window.webkit.messageHandlers.showMeasureStatus.postMessage('')
      return promise
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

export function app_endMeasuring() {
  try {
    if (window.reportApp) {
      return window.reportApp.endMeasuring()
    } else {
      window.webkit.messageHandlers.endMeasuring.postMessage('')
    }
  } catch (e) {
    console.log(e)
  }
}

const getAppAndUserinfoCbs = []
window.pushAppAndUserinfo = (res) => {
  let info = {}
  try {
    info = JSON.parse(res)
  } catch (e) { /* empty */ }
  getAppAndUserinfoCbs.forEach(cb => cb(info))
  getAppAndUserinfoCbs.length = 0
}
export function app_getAppAndUserinfo() {
  try {
    return JSON.parse('{"app_key":"d48bfe662bda86dbde9028632c7b16a3"}')
    // if (window.reportApp) {
    //   return Promise.resolve(
    //     JSON.parse(window.reportApp.getAppAndUserinfo() || '{}')
    //     // window.reportApp.getAppAndUserinfo() || '{}'
    //   )
    // } else {
    //   const promise = new Promise(resolve => {
    //     getAppAndUserinfoCbs.push(resolve)
    //   })
    //   window.webkit.messageHandlers.getAppAndUserinfo.postMessage('')
    //   return promise
    // }
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}

export function app_onWebBackPressed() {
  try {
    if (window.reportApp) {
      return window.reportApp.onWebBackPressed()
    } else {
      window.webkit.messageHandlers.onWebBackPressed.postMessage('')
    }
  } catch (e) {
    console.log(e)
  }
}

