// import mockData from "./mock"

const isDev = import.meta.env.DEV

// if (isDev) {
//   window.reportApp = mockData
// }

const reportWeb = {

}

export function expandWebview(property, value) {
  if (reportWeb[property]) return false
  reportWeb[property] = value
  if (isDev) {
    reportWeb[property](mockData.getWaveData())
  } 
  return true
}

export function shrinkWebview(property, value) {
  return delete reportWeb[property]
}

export default (app) => {
  window.reportWeb = reportWeb
}
