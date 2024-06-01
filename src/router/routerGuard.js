import router from './index'
import { isIdentityValid } from '@/utils/auth'
import {app_getDeviceStatus, getQueryString} from "@/utils/bridge.js";

const whiteList = ['Login', 'Error']

// router.beforeEach((to, from, next) => {
//   // if (isIdentityValid() || whiteList.includes(to.name)) {
//   //   next()
//   // } else {
//   //   if (from.name === 'Login') {
//   //     next({
//   //       name: 'Error'
//   //     })
//   //   } else {
//   //     // next({
//   //     //   name: 'Login',
//   //     //   query: {
//   //     //     redirect: location.href + to.fullPath.slice(1)
//   //     //   }
//   //     // })
//   //     next({
//   //       name: 'Login',
//   //       query: {
//   //         mac: getQueryString('mac')
//   //       }
//   //     })
//   //   }
//   // }
// })
router.afterEach(() => {
  document.querySelector('#app-pre-skeleton')?.remove()
})
