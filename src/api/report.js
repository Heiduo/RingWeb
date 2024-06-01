import { postRequest } from './request'
import dayjs from 'dayjs'

export const reportApi = {
  API_REPORT_DETAILS: 'report/evaluation/speciality/details',
  API_REPORTS_LIST: 'report/evaluation/speciality/list',
  API_REPORT_UPLOAD: 'health/synthesis/measurement',
  API_REPORT_CREATE: 'report/evaluation/speciality/create',
  API_REPORT_FUNCTIONS: 'report/evaluation/speciality/functions',
  API_REPORT_ANALYSIS: 'report/evaluation/speciality/analysis',
  API_REPORT_QINIU_TOKEN: 'report/evaluation/speciality/qiniu/token',
}

export function request_reportDetails(data) {
  return postRequest({
    url: reportApi.API_REPORT_DETAILS,
    data,
  }).then(res => {
    const {
      emotion_data = {}, health_data = {}, hr_data = {},
      hrv_data = {}, user = {}, bp_data = {}, bg_data = {},
      bo_data = {}, rr_data = {}, af_data = {}, sa_data = {},
      bv_data = {}
    } = (res.data || {})
    return {
      ...res,
      data: {
        emotionData: {
          list: (() => {
            return emotion_data.list?.map(item => {
              let emoList = [].concat(item.emo || [])
              emoList.splice(1, 1)
              emoList = emoList.map(item => item.toFixed(1))
              emoList.splice(1, 0, (1 - emoList.reduce((prev, curr) => +curr + prev, 0)).toFixed(1))
              return {
                ...item,
                emo: emoList
              }
            }) || []
          })(),
          analysis: emotion_data.point_analysis || '',
          status: emotion_data.point_status || '',
        },
        healthData: {
          list: health_data.list || [],
          analysis: {
            pressure: Object.assign({
              data: 0,
              describe: '',
              spread: [0, 0, 0, 0],
              status: '',
              spreadStatus: '',
            }, health_data.pressure_analysis || {}),
            anxiety: Object.assign({
              data: 0,
              describe: '',
              spread: [0, 0, 0, 0],
              status: '',
              spreadStatus: '',
            }, health_data.anxiety_analysis || {}),
            depression: Object.assign({
              data: 0,
              describe: '',
              spread: [0, 0, 0, 0],
              status: '',
              spreadStatus: '',
            }, health_data.depression_analysis || {}),
            fatigue: Object.assign({
              data: 0,
              describe: '',
              spread: [0, 0, 0, 0],
              status: '',
              spreadStatus: '',
            }, health_data.fatigue_analysis || {}),
          },
        },
        heartRateData: {
          list: hr_data.list || [],
          analysis: {
            data: hr_data.result_analysis?.data || '',
            status: hr_data.result_analysis?.status || '',
            describe: hr_data.result_analysis?.describe || '',
          },
        },
        bloodPressureData: {
          list: bp_data.list || [],
          analysis: {
            data: bp_data.result_analysis?.data || '',
            status: bp_data.result_analysis?.status || '',
            describe: bp_data.result_analysis?.describe || '',
          },
        },
        bloodSugarData: {
          list: bg_data.list || [],
          analysis: {
            data: bg_data.result_analysis?.data || '',
            status: bg_data.result_analysis?.status || '',
            describe: bg_data.result_analysis?.describe || '',
          },
        },
        bloodOxygenData: {
          list: bo_data.list || [],
          analysis: {
            data: bo_data.result_analysis?.data || '',
            status: bo_data.result_analysis?.status || '',
            describe: bo_data.result_analysis?.describe || '',
          },
        },
        respiratoryRateData: {
          list: rr_data.list || [],
          analysis: {
            data: rr_data.result_analysis?.data || '',
            status: rr_data.result_analysis?.status || '',
            describe: rr_data.result_analysis?.describe || '',
          },
        },
        arrhythmiaData: {
          list: sa_data.list || [],
          analysis: {
            data: sa_data.result_analysis?.data || '',
            status: sa_data.result_analysis?.status || '',
            describe: sa_data.result_analysis?.describe || '',
          },
        },
        atrialFibrillationData: {
          list: af_data.list || [],
          analysis: {
            data: af_data.result_analysis?.data || '',
            status: af_data.result_analysis?.status || '',
            describe: af_data.result_analysis?.describe || '',
          },
        },
        bloodViscosityData: {
          list: bv_data.list || [],
          analysis: {
            data: bv_data.result_analysis?.data || '',
            status: bv_data.result_analysis?.status || '',
            describe: bv_data.result_analysis?.describe || '',
          },
        },
        hrvData: {
          list: hrv_data.hrv_data_list.list || [],
        },
        user,
      },
    }
  })
}

export function request_reportFunctions(data) {
  return postRequest({
    url: reportApi.API_REPORT_FUNCTIONS,
    data,
  })
}

export function request_reportAnalysis(data) {
  if (!data.data) {
    return Promise.resolve({
      status: true,
      data: {
        data: 0,
        status: '',
        describe: '',
      }
    })
  }
  return postRequest({
    url: reportApi.API_REPORT_ANALYSIS,
    data,
  })
}

export function request_reportsList(data) {
  return postRequest({
    url: reportApi.API_REPORTS_LIST,
    data,
  })
}

export function request_reportUpload(data) {
  const { begin_time, end_time } = data
  if (
    begin_time && end_time &&
    (dayjs(begin_time).millisecond() + 1000 * 30) < dayjs(end_time).millisecond()
  ) {
    return Promise.resolve()
  }
  return postRequest({
    url: reportApi.API_REPORT_UPLOAD,
    data,
  })
}

export function request_reportCreate(data) {
  return postRequest({
    url: reportApi.API_REPORT_CREATE,
    data,
  })
}

export function request_reportQiNiuToken(data) {
  return postRequest({
    url: reportApi.API_REPORT_QINIU_TOKEN,
    data,
  })
}
