<template>
  <div class="payment-wrap">
    <van-nav-bar
        class="nav-bar"
        title="订单支付"
        left-text="返回"
    />

  </div>
</template>


<script>
import { useLogin } from '@/hooks/useLogin'
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { app_getAppAndUserinfo, app_getDeviceStatus } from '@/utils/bridge'
import {getAppMac} from "@/utils/auth.js";
import {useUserStore} from "@/store/index.js";

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { login } = useLogin()
    console.log("LoginPage")
	  Promise.all([
		  app_getAppAndUserinfo(),
		  app_getDeviceStatus()
	  ]).then(([params,deviceInfo]) => {
      const { mac } = deviceInfo
      if (mac!=null){
        login({
          ...params,
          mac,
        }).then(_ => {
          setTimeout(_ => {
            console.log(getAppMac())
            const userStore = useUserStore()

            console.log(''+userStore.userinfo.contacts.length)
            // console.log(''+userStore.userinfo.contacts)
          }, 100)
        }).catch(e => {
          // console.log(e)
          router.replace({ name: 'Error' })
        })
      }else{
        router.replace({ name: 'Error' })
      }

	  })
    return () => h('div')
  }
}
</script>

<style scoped lang='less'>
.payment-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-content {
  .payment-item {
    margin-top: 60px;
    &:first-child {
      margin-top: 0;
    }
  }
  .payment-item-title {
    display: flex;
    align-items: center;
  }
  .pay-icon {
    width: 20px;
    margin-right: 4px;
  }
}
.manual-back-desc {
  margin-top: 40px;
  font-size: 15px;
  text-align: center;
  .btn-back {
    color: #4680F1;
  }
}
</style>
