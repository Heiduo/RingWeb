import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

export const pinia = createPinia()

export const useUserStore = defineStore('user', () => {
  const userinfo = ref({
    name: '',
    nickname: '',
    gender: '', // 1 男   2 女  3 未知
    device: {
      name: '',
      mac: '',
      status: 0
    },
    token: '',
    contacts:[]
  })
  return { userinfo }
})

export default pinia
