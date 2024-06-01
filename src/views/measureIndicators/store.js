import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { connectDevice, formatWebviewResult, isDeviceConnected } from './utils'
import dayjs from 'dayjs'
import Countdown from '@/utils/countdown'
import { request_reportUpload } from '@/api/report'
import { expandWebview } from '@/plugins/webviewCommunicate/webviewCommunicate'

export const measureStatus = {
  disconnect: {
    desc: '未连接',
    color: '#313131',
    value: 'disconnect'
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

const isDev = import.meta.env.DEV

export const useMeasureStore = defineStore('measureStore', () => {
  const status = ref('disconnect') // measureStatus
  const startTime = ref('')
  const endTime = ref('')
  const timeGap = ref({
    minutes: 0, seconds: 0, hours: 0
  })

  const waveData = ref([])
  expandWebview('loadWaveData', (data) => {
    waveData.value.push(...formatWebviewResult((formatWebviewResult(data)?.list || '[]')))
  })
  const isUploadWaveLoading = ref(false)
  const uploadPromise = ref(Promise.resolve())

  const statusWatcherHandler = (() => {
    let gapInterval = null
    let uploadWaveInterval = null
    let mockInterval = null
    return (currStatus, oldStatus) => {
      // console.log('oldStatus: ', oldStatus)
      // console.log('currStatus: ', currStatus)
      clearInterval(gapInterval)
      clearInterval(uploadWaveInterval)
      clearInterval(mockInterval)
      if (currStatus === 'measuring') {
        startTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
        endTime.value = ''
        gapInterval = Countdown(new Date(), (ts) => {
          const { minutes = 0, seconds = 0, hours = 0 } = ts
          timeGap.value = { minutes, seconds, hours }
        })
        // if (isDev) {
        //   mockInterval = setInterval(_ => {
        //     window.reportWeb['loadWaveData'](window.reportApp.getWaveData())
        //   }, 200)
        // }
        uploadWaveInterval = setInterval(_ => {
          endTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
          uploadWaveData()
        }, 60 * 1000)
      } else if (oldStatus === 'measuring') {
        endTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
        uploadWaveData()
        endTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    }
  })()
  watch(status, statusWatcherHandler)

  function uploadWaveData() {
    // console.log('开始执行上传数据')
    isUploadWaveLoading.value = true
    const currWaveData = [...waveData.value]
    waveData.value = []
    // console.log('currWaveData: ', currWaveData.length)
    if (
      !currWaveData.length ||
      currWaveData.length < 4100 ||
      currWaveData.length > 5600
    ) {
      // console.log('数据长度不足')
      return uploadPromise.value = Promise.resolve()
    }
    return uploadPromise.value = request_reportUpload({
      pulse_wave: currWaveData,
      middle_value: [],
      begin_time: dayjs(endTime.value).subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      end_time: endTime.value,
      sample_rate: 81,
    })
      .finally((_) => {
        isUploadWaveLoading.value = false
      }).catch(_ => {
        // waveData.value = [...currWaveData, ...waveData.value]
        // console.log('上传数据失败')
      })
  }
  return {
    timeGap,
    status,
    waveData,
    connectDevice,
    isDeviceConnected,
    uploadPromise,
    isUploadWaveLoading,
    startTime,
    endTime,
  }
})
