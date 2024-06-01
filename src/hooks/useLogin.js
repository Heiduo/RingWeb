import { request_userLogin } from '@/api/user'
import { setAppKey, setAppMac, setAppToken } from '@/utils/auth'
import { useUserStore } from '@/store'

export function useLogin() {
  function login(params) {
    const { app_key, mac } = params
    const store = useUserStore()
    return request_userLogin(params).then(res => {
      // console.log("data:" + res.data.toString())
      const { token } = res.data
      setAppToken("token")
      setAppMac(mac)
      setAppKey(app_key)
      Object.assign(store.userinfo, {
        ...res.data,
        app_key,
        mac,
        token,
      })
      return res.data
    })
  }
  return {
    login,
  }
}
