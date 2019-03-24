

// @author 谷中仁
import HttpClient from '@utils/HttpClient'

/**
 * 获取水雨情站点统计数据
 *
 * @export
 * @param {string} [url=`summit-eswatf/watf/pptnGroupSum`] 请求地址
 * @param {object} [params={}]　参数
 * @returns Promise
 */
const defaultWatfParams = {
  pageNo: 1,
  pageSize: 100
}
export function GetWatf(url = `api/river`, params = defaultWatfParams) {
  return HttpClient.get(url, params)
}

const defaultStationParams = {
  param: ''
}

export function GetStation(url = `api/station`, params = defaultStationParams) {
  return HttpClient.get(url, params)
}


const pptnGroupSumParam = {
  timeInterval: '1',
  startTime: '2017-01-01 00:00:00',
  groupField: 'stcd',
  sumField: 'drp',
  condition: 'byYear',
  stcdList: '10620045,10811920,10835836'
}

export function GetPptnGroupSum(url = `api/watf/pptnGroupSum`, params = pptnGroupSumParam) {
  return HttpClient.get(url, params)
}

/**
 * 获取水情列表接口默认参数
 */
const waterListQueryParam = {
  'pageSize': 100, // 每页展示的站个数
  'currentPage': 1, // 当前页数
  'willPage': 1, // 将要跳转的页数
  'stcdList': '', // 查询的stcd列表
  'timeRange': '' // 时间范围
}
/**
 * 获取水情列表
 * @param url 接口地址
 * @param params 见默认参数注释
 */
export function GetWaterLists(url = `api/river/groupByMaxTmGet`, params = waterListQueryParam) {
  return HttpClient.get(url, params)
}

/**
 * 通过stcd获取对应水情站详情
 * @param url 接口地址
 * @param params stcd-站id
 */
// export function GetWaterDetailByStcd(url = `api/river/queryBaseInformationGet`, params = {'stcd': '10812271'}) {
export function GetWaterDetailByStcd(url, params) {
  return HttpClient.get(url, params)
}

/**
 * 获取运维所有需要展示在地图上的点
 * @param url API地址
 * @param params 参数-当前为无参函数 
 */
export function GetAllOPSPoints(url = '/api/gis/points', params = {}) {
  return HttpClient.get(url, params)
}




export default {
  GetWatf,
  GetStation,
  GetPptnGroupSum,
  GetWaterLists,
  GetAllOPSPoints
}

