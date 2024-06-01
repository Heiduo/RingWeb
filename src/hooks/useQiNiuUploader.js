import * as qiniu from 'qiniu-js'

/*
const observer = {
  next(res){
    // ...
  },
  error(err){
    // ...
  },
  complete(res){
    // ...
  }
}*/

/* const putExtra = {
  // fname: "qiniu.txt", // 文件原始文件名，若未指定，则魔法变量中无法使用 fname、ext、suffix
  mimeType: "text/plain", //指定所传的文件类型
  customVars: { 'x:test': 'qiniu', ... }, //用来放置自定义变量，变量名必须以 x: 开始，自定义变量格式及说明请参考 文档
  metadata: { 'x-qn-meta': 'qiniu', ... }, //用来防止自定义 meta，变量名必须以 x-qn-meta-开始，自定义资源信息格式及说明请参考
}*/
export function useQiNiuUploader() {
  function upload(observer, { file, key, token, putExtra, config }) {
    const observable = qiniu.upload(file, key, token, putExtra, config)
    const subscription = observable.subscribe(observer)
    return { observable, subscription }
  }
  return { upload }
}
