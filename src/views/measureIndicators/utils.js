import { intervalCheckPromise } from '@/utils/tools'
import { getAppMac } from '@/utils/auth'
import router from '@/router'
import { useUserStore } from '@/store/index'
import pinia from '@/store/index'
import {
  app_connectDevice, app_disconnectWatch,
  app_setMeasureStatus, app_getDeviceStatus, app_showMeasureStatus,
  app_endMeasuring,
} from '@/utils/bridge'

const userStore = useUserStore(pinia)
export function connectDevice() {
  app_connectDevice()
  let onSuccess
  let onFailed
  const result = new Promise((resolve, reject) => {
    onSuccess = resolve
    onFailed = reject
  })
  let time = 0
  getStatus()
  function getStatus() {
    if (time >= 13) return
    time++
    isDeviceConnected().then(_ => {
      onSuccess()
    }).catch(_ => {
      if (time === 13) {
        onFailed({
          error_message: '连接超时，请重新连接'
        })
      }
      getStatus()
    })
  }
  return result
}

export function disconnectDevice() {
  app_disconnectWatch()
  let onSuccess
  let onFailed
  const result = new Promise((resolve, reject) => {
    onSuccess = resolve
    onFailed = reject
  })
  let time = 0
  getStatus()
  function getStatus() {
    if (time >= 13) return
    time++
    isDeviceDisconnected().then(_ => {
      onSuccess()
    }).catch(_ => {
      if (time === 13) {
        onFailed({
          error_message: '断开超时，请重新连接'
        })
      }
      getStatus()
    })
  }
  return result
}

export function setMeasureStatus(status) {
  // 0 测量结束   1 测量开始  2 暂停  3 继续
  app_setMeasureStatus(status)
}

export function getDeviceStatus() {
  const mac = getAppMac()
  if (!mac) {
    router.replace({
      name: 'Login',
      query: {
        redirect: location.href
      }
    })
    return Promise.reject()
  }
  return app_getDeviceStatus(mac).then(res => {
    Object.assign(userStore.userinfo.device, res)
    return res.status
  })
}

export function getMeasureStatus() {
  return app_showMeasureStatus()
}

export function isDeviceConnected() {
  return getDeviceStatus().then(res => {
    if (res === '2') {
      return Promise.resolve()
    }
    return Promise.reject()
  })
}

export function isDeviceDisconnected() {
  return getDeviceStatus().then(res => {
    if (res === '0') {
      return Promise.resolve()
    }
    return Promise.reject()
  })
}

export function endMeasuring() {
  app_endMeasuring()
  let onSuccess
  let onFailed
  const result = new Promise((resolve, reject) => {
    onSuccess = resolve
    onFailed = reject
  })
  let time = 0
  getStatus()
  function getStatus() {
    if (time >= 13) return
    time++
    getMeasureStatus().then(status => {
      if (status === '0') {
        onSuccess()
      } else {
        throw 'err'
      }
    }).catch(_ => {
      if (time === 13) {
        onFailed({
          error_message: '结束失败，请稍后再试'
        })
      }
      getStatus()
    })
  }
  return result
}

export const watchStatus = {
  disconnect: {
    desc: '未连接',
    color: '#313131',
    value: 'disconnect'
  },
  connecting: {
    desc: '连接中',
    color: '#313131',
    value: 'connecting'
  },
  ready: {
    desc: '去测量',
    color: '#64F4AF',
    value: 'ready'
  },
  countdown: {
    desc: '准备开始',
    color: '#148FFF',
    value: 'countdown'
  },
  startMeasuring: {
    desc: '测量开始',
    color: '#148FFF',
    value: 'startMeasuring'
  },
  measuring: {
    desc: '测量中',
    color: '#148FFF',
    value: 'measuring'
  },
  completed: {
    desc: '已完成',
    color: '#64F4AF',
    value: 'completed'
  }
}

export const bluetoothStatus = {
  disconnect: {
    desc: '未连接',
    value: '0'
  },
  connecting: {
    desc: '连接中',
    value: '1'
  },
  connected: {
    desc: '已连接',
    value: '2'
  },
  disconnecting: {
    desc: '断连中',
    value: '3'
  }
}

const bluetoothStatusToWatchStatus = {
  [bluetoothStatus.disconnect.value]: watchStatus.disconnect,
  [bluetoothStatus.connecting.value]: watchStatus.connecting,
  [bluetoothStatus.connected.value]: watchStatus.ready,
  [bluetoothStatus.disconnecting.value]: watchStatus.disconnect
}

export function formatWebviewResult(result) {
  try {
    result = JSON.parse(result)
  } catch (e) {
    /* empty */
  }
  return result
}

export const measureStatus = {
  disconnect: {
    desc: '未连接',
    color: '#313131',
    value: 'disconnect'
  },
  connecting: {
    desc: '连接中',
    color: '#313131',
    value: 'connecting'
  },
  ready: {
    desc: '去测量',
    color: '#64F4AF',
    value: 'ready'
  },
  countdown: {
    desc: '准备开始',
    color: '#148FFF',
    value: 'countdown'
  },
  startMeasuring: {
    desc: '测量开始',
    color: '#148FFF',
    value: 'startMeasuring'
  },
  measuring: {
    desc: '测量中',
    color: '#148FFF',
    value: 'measuring'
  },
  completed: {
    desc: '已完成',
    color: '#64F4AF',
    value: 'completed'
  }
}
