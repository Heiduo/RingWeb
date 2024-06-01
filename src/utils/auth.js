import Cookies from 'js-cookie'
import { parseURL } from '@/utils/tools'
import router from '@/router'
import { useUserStore } from '@/store'

export function setAppToken(token) {
  return Cookies.set('app_token', token, {
    path: '/'
  })
}

export function setAppKey(key) {
  return Cookies.set('app_key', key, {
    path: '/'
  })
}

export function setAppMac(mac) {
  return Cookies.set('app_mac', mac, {
    path: '/'
  })
}

export function getAppToken() {
  return Cookies.get('app_token') || ''
}

export function getAppKey(key) {
  return Cookies.get('app_key') || ''
}

export function getAppMac(key) {
  return Cookies.get('app_mac') || ''
}

function removeCookie() {
  Cookies.remove('app_token', {
    path: '/'
  })
  Cookies.remove('app_key', {
    path: '/'
  })
  Cookies.remove('app_mac', {
    path: '/'
  })
}

/*
 * @param redirect(String|Object, false), string时直接作为重定向链接，
 * object时作为router.resolve参数解析重定向地址
 * */
export function logout(redirect) {
  let redirectUrl = ''
  removeCookie()
  if (redirect) {
    if (typeof redirect === 'object') {
      try {
        redirectUrl = router.resolve(redirect).path
      } catch (err) {
        console.log(`route name not exist：${redirect.name}`)
      }
    } else {
      redirectUrl = redirect
    }
  }
  const userStore = useUserStore()
  Object.assign(userStore, {
    name: '',
    gender: '', // 1 男   2 女  3 未知
    device: {
      name: '',
      mac: '',
      status: 0
    }
  })
  router.replace({
    name: 'Login',
    query: {
      redirect: encodeURI(redirectUrl)
    }
  })
}

export function isIdentityValid() {
  const tokens = {
    token: getAppToken(),
    app_key: getAppKey(),
    mac: getAppMac()
  }
  return Object.values(tokens).every(item => item && item !== 'undefined')
}
