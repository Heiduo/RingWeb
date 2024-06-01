import { computed, ref } from 'vue'
import { request_reportsList } from '@/api/report'
import dayjs from 'dayjs'
import {app_getAppAndUserinfo, app_getDeviceStatus} from "@/utils/bridge.js";
import {getAppMac} from "@/utils/auth.js";
import {useUserStore} from "@/store/index.js";
import {useLogin} from "@/hooks/useLogin.js";
import { useRoute, useRouter } from 'vue-router'

export function useResultData() {
  const loading = ref(false)
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 20
  })
  const dataList = ref([])
  function getData() {
    loading.value = true
    const { current, pageSize } = pagination.value
    return request_reportsList({
      offset: (current * pageSize) - pageSize,
      limit: pageSize
    }).then(res => {
      const { count, list } = res.data
      pagination.value.total = +count
      return list.map(item => {
        const startTime = dayjs(item.begin_time)
        const endTime = dayjs(item.end_time)
        return {
          ...item,
          startDate: `${startTime.year()}年${startTime.month() + 1}月${startTime.date()}日`,
          interval: startTime.format('hh:mm'),
          startTime: Math.floor((endTime.unix() - startTime.unix()) / 60) + 'min',
        }
      })
    }).finally(_ => {
      loading.value = false
    })
  }

  const loadFinished = computed(() => pagination.value.total <= dataList.value.length)
  function loadMore() {
    if (loading.value || loadFinished.value) return
    pagination.value.current++
    getData().then(list => {
      dataList.value.push(...list)
    })
  }
  function init() {
    Object.assign(pagination.value, {
      total: 0,
      current: 1,
      pageSize: 20
    })
    getData().then(list => {
      dataList.value = list
    })
  }
  init()
  return {
    loading, pagination, dataList, getData,
    loadFinished, loadMore,
  }
}

export function useHomeData() {
  const homeTitle = ref("")
  const { login } = useLogin()
  const dataList = ref([])
  const router = useRouter()
  const loading = ref(false)

  const loadFinished = computed(() => dataList.value.length>=0)

  function init() {
    const params = app_getAppAndUserinfo()
    // console.log("params:"+params.app_key)
    loading.value = true
    const deviceInfo = app_getDeviceStatus()
    const { mac } = deviceInfo
    login({
      ...params,
      mac,
    }).then(_ => {
      // console.log("contacts:"+useUserStore().userinfo.contacts)
      dataList.value = useUserStore().userinfo.contacts
      homeTitle.value = useUserStore().userinfo.name+"的二维码"
      // for (let i = 0; i <dataList.value.length; i++) {
      //   console.log("dataList"+i+":"+JSON.stringify(dataList.value[i]))
      // }
      // return useUserStore().userinfo.contacts
    }).catch(e => {
      // console.log(e)
      router.replace({ name: 'Error' })
      // return []
    }).finally(_ => {
      loading.value = false
    })

  }
  function loadMore() {
    if (loading.value || loadFinished.value) return
    init()
  }
  init()
  return {
    loading, homeTitle, dataList,loadFinished, loadMore,
  }
}

