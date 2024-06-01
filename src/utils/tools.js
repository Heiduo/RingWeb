export function parseURL(str = window.location.href) {
  if (typeof str !== 'string') {
    return {}
  }
  const paramObj = {}
  const _str = str.substring(str.indexOf('?') + 1)
  // 解析中文
  const paraArr = decodeURIComponent(_str).split('&')
  let tmp, key, value, newValue
  let i = 0, len = paraArr.length
  for (; i < len; i++) {
    tmp = paraArr[i].split('=')
    key = tmp[0]
    value = tmp[1] || ''
    // 处理数字'100'=>100
    if (typeof value === 'string' && isNaN(Number(value)) === false) {
      value = Number(value)
    }
    // 如果key没有出现过(可能是0 或者false)
    if (typeof paramObj[key] === 'undefined') {
      paramObj[key] = value
    } else {
      newValue = Array.isArray(paramObj[key]) ? paramObj[key] : [paramObj[key]]
      newValue.push(value)
      paramObj[key] = newValue
    }
  }
  return paramObj
}

export function assign(target, sources = {}) {
  Array.from(arguments).slice(1).forEach(source => {
    Object.keys(source).forEach(key => {
      target[key] = source[key]
    })
  })
  return target
}

export function intervalCheckPromise(maxTry, interval, assert, res, err) {
  return new Promise((resolve, reject) => {
    let tryTimes = 0
    let checkTimer = setInterval(_ => {
      tryTimes++
      if (assert()) {
        clearInterval(checkTimer)
        resolve(typeof res === 'function' ? res() : res)
      } else if (tryTimes > maxTry) {
        clearInterval(checkTimer)
        reject(typeof err === 'function' ? err() : err)
      }
    }, 2000)
  })
}
