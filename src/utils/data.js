export const imageType = {
  wechat: {
    value: '1',
    label: '微信',
    color: '#F77062',
  },
  qq: {
    value: '2',
    label: 'QQ',
    color: '#76FF54',
  },
  weibo: {
    value: '3',
    label: '微博',
    color: '#F9D423',
  },
  kuai: {
    value: '4',
    label: '快手',
    color: '#CA65FA',
  },
  tiktok: {
    value: '5',
    label: '抖音',
    color: '#89F7FE',
  },
  alipay: {
    value: '6',
    label: '支付宝',
    color: '#418B5F',
  },
  dingding: {
    value: '7',
    label: '钉钉',
    color: '#F9F586',
  },
  baidu: {
    value: '8',
    label: '百度',
    color: '#F9F586',
  },
}

export const emotionType = {
  angry: {
    value: '0',
    label: '愤怒',
    color: '#F77062',
  },
  calm: {
    value: '1',
    label: '平静',
    color: '#76FF54',
  },
  surprised: {
    value: '2',
    label: '惊讶',
    color: '#F9D423',
  },
  fearful: {
    value: '3',
    label: '恐惧',
    color: '#CA65FA',
  },
  anger: {
    value: '4',
    label: '伤心',
    color: '#89F7FE',
  },
  disgusted: {
    value: '5',
    label: '厌恶',
    color: '#418B5F',
  },
  happy: {
    value: '6',
    label: '愉悦',
    color: '#F9F586',
  },
}

export const imageTypeValueLabel = Object.keys(imageType).reduce((result, key) => {
  Object.assign(result, {
    [imageType[key].value]: imageType[key].label
  })
  return result
}, {})

export const emotionValueLabel = Object.keys(emotionType).reduce((result, key) => {
  Object.assign(result, {
    [emotionType[key].value]: emotionType[key].label
  })
  return result
}, {})

export const emotionValueColor = Object.keys(emotionType).reduce((result, key) => {
  Object.assign(result, {
    [emotionType[key].value]: emotionType[key].color
  })
  return result
}, {})

export const pressureLevel = {
  normal: {
    value: '0',
    label: '正常',
    color: '#7BD1E4',
  },
  mild: {
    value: '1',
    label: '轻度压力',
    color: '#7BE4CB',
  },
  moderate: {
    value: '2',
    label: '中度压力',
    color: '#FFD74B',
  },
  severe: {
    value: '3',
    label: '重度压力',
    color: '#FF4588',
  },
}

export const pressureValueColor = Object.keys(pressureLevel).reduce((result, key) => {
  Object.assign(result, {
    [pressureLevel[key].value]: pressureLevel[key].color
  })
  return result
}, {})

export const pressureValueLabel = Object.keys(pressureLevel).reduce((result, key) => {
  Object.assign(result, {
    [pressureLevel[key].value]: pressureLevel[key].label
  })
  return result
}, {})

export const anxietyLevel = {
  normal: {
    value: '0',
    label: '正常',
    color: '#7BD1E4',
  },
  mild: {
    value: '1',
    label: '轻度焦虑',
    color: '#7BE4CB',
  },
  moderate: {
    value: '2',
    label: '中度焦虑',
    color: '#FFD74B',
  },
  severe: {
    value: '3',
    label: '重度焦虑',
    color: '#FF4588',
  },
}
export const anxietyValueColor = Object.keys(anxietyLevel).reduce((result, key) => {
  Object.assign(result, {
    [anxietyLevel[key].value]: anxietyLevel[key].color
  })
  return result
}, {})

export const anxietyValueLabel = Object.keys(anxietyLevel).reduce((result, key) => {
  Object.assign(result, {
    [anxietyLevel[key].value]: anxietyLevel[key].label
  })
  return result
}, {})

export const depressionLevel = {
  normal: {
    value: '0',
    label: '正常',
    color: '#7BD1E4',
  },
  mild: {
    value: '1',
    label: '轻度抑郁',
    color: '#7BE4CB',
  },
  moderate: {
    value: '2',
    label: '中度抑郁',
    color: '#FFD74B',
  },
  severe: {
    value: '3',
    label: '重度抑郁',
    color: '#FF4588',
  },
}

export const depressionValueColor = Object.keys(depressionLevel).reduce((result, key) => {
  Object.assign(result, {
    [depressionLevel[key].value]: depressionLevel[key].color
  })
  return result
}, {})

export const depressionValueLabel = Object.keys(depressionLevel).reduce((result, key) => {
  Object.assign(result, {
    [depressionLevel[key].value]: depressionLevel[key].label
  })
  return result
}, {})
