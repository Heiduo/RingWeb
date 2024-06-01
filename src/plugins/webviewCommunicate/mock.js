const measureStore = {
  status: 0, // 0：测量结束 1: 测量开始 2：暂停 3：继续

}

const deviceStore = {
  name: '',
  mac: '00:00:00:00:00:00',
  status: '0', // 设备状态 0:未连接 1:连接中 2:已连接 3:断连中
}

const waveStore = {
  list: "[-1506574,-1834058,-2006566,-2093362,-2153218,-2269336,-2577112,-2981958,-3298374,-3435450,-3444976,-3501598,-3677120,-3870154,-4058824,-4292378]"
  // list: [1551886, 1471344, 1348082, 1187110, 1014674, 264664, 78614, -36382, -155182, -303274, -434418, -603652, -777180, -940270, -1112402, -1232224, 1551886, 1471344, 1348082, 1187110, 1014674, 264664, 78614, -36382, -155182, -303274, -434418, -603652, -777180, -940270, -1112402, -1232224, -1266914, -1167892, -900180, -439806, 2704960, 3433000, 4070960, 4537716, 4891900, 5123020, 5181124, 5056120, 4814834, 4501384, 4131568, 3740250, 3327532, 2911968, 2516864, 2204410, 1925986, 1606700, 1319070, 1118164, 951320, 786566, 617228, 443298, 306340, 182500, 5280, -199458, -404080, -550546, -646868, -779610, -1006980, -1250766, -1433172, -1574238, -1717400, -1829472, -1901846, -1990072, -2067796, -2048382, -1873286, -1479986, -842014, -55434, 801784, 1634150, 2390956, 3040538, 3514858, 3809260, 3989254, 4034808, 3953180, 3786574, 3552586, 3284768, 2983732, 2610652, 2221744, 1895906, 1614062, 1392422, 1208016, 1003496, 764702, 570356, 441708, 346660, 282108, 190682, 21122, -182170, -364170, -534124, -748516, -1008644, -1223360, -1361504, -1456198, -1519180, -1608724, -1734500, -1845608, -1940256, -2053086, -2195196, -2301868, -2304878, -2192744, -1874578, -1334646, -677448, 44584, 771668, 1425286, 1936462, 2310306, 2541612, 2638610, 2610330, 2500996, 2349602, 2162262, 1901506, 1551038, 1167172, 809594, 510846, 280460, 126566, -20, -106314, -158258, -190880, -236780, -295342, -365682, -368654, -360598, -422644, -466598, -459738, -452320, -476596, -531142, -583474, -599668, -621424, -702846, -780610, -831516, -897144, -942898, -904188, -785354, -533638, -57862, 613466, 1424610, 2319176, 3215452, 4003790, 4695274, 5230326, 5583248, 5754190, 5745790, 5622388, 5494084, 5348962, 5093132, 4750526, 4383652, 4045812, 3721530, 3413250, 3145978, 2916706, 2707468, 2509778, 2360516, 2241090, 2076236, 1930628, 1845642, 1766198, 1647878, 1497612, 1317668, 1170552, 1077556, 967342, 815256, 657334, 506598, 403058, 314552, 237792, 224264, 233332, 277842, 438544, 783964, 1323282, 2039246, 2875278, 3742776, 4554906, 5283316, 5850714, 6259092, 6560358, 6774826, 6846906, 6763654, 6581998, 6290480, 5899334, 5470898, 5080480, 4741260, 4398474, 4037908, 3700884, 3406000, 3182784, 2986954, 2786828, 2646866, 2554532, 2427816, 2246576, 2056570, 1858050, 1614982, 1352060, 1093996, 901640, 745748, 576592, 385680, 190952],
}

const userStore = {
  app_key: 'd48bfe662bda86dbde9028632c7b16a3',
  account: '18175934990',
  account_type: '0',
  passwd: '123456',
  mac: '00:00:00:00:00:00',
  gender: '1', // '1': 男, '2': 女, '3':未知
  birthday: '',
  height: '',
  weight: '',
}

const mockData = {
  getWaveData() {
    return JSON.stringify(waveStore)
  },
  getAppAndUserinfo() {
    return JSON.stringify({
      app_key: 'd48bfe662bda86dbde9028632c7b16a3',
      account: '18175934990',
      account_type: '0',
      passwd: '123456',
      mac: '00:00:00:00:00:00'
    })
  },
  getDeviceStatus() {
    return JSON.stringify(deviceStore)
  },
  showMeasureStatus() {
    return JSON.stringify(measureStore)
  },
  connectDevice() {
    if (['1', '2'].includes(deviceStore.status)) return
    setTimeout(_ => {
      deviceStore.status = '1'
      setTimeout(_ => {
        deviceStore.status = '2'
      }, 3000)
    }, 2000)
  },
  disconnectWatch() {
    if (['0', '3'].includes(deviceStore.status)) return
    setTimeout(_ => {
      deviceStore.status = '3'
      setTimeout(_ => {
        deviceStore.status = '0'
      }, 3000)
    }, 2000)
  },
  startMeasuring() {
    if (['1', '3'].includes(measureStore.status)) return
    setTimeout(_ => {
      measureStore.status = '1'
    }, 2000)
  },
  endMeasuring() {
    if (['0'].includes(measureStore.status)) return
    setTimeout(_ => {
      measureStore.status = '0'
    }, 3000)
  },
  setMeasureStatus() {

  }
}

export default mockData