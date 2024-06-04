import { request_userLogin, request_userLogin_pre } from '@/api/user'
import { setAppKey, setAppMac, setAppToken } from '@/utils/auth'
import { useUserStore } from '@/store'

export function useLogin() {
  function login(params) {
    const { app_key, mac } = params
    const store = useUserStore()
    // console.log('0000')
    return request_userLogin(params).then(res =>{
      // console.log('11111')
      return request_userLogin(params).then(res => {
        // console.log("data:" + res.data.toString())
        // console.log('22222')
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
    )

  }
  return {
    login,
  }
}
