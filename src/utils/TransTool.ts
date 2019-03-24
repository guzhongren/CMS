/**
 * @author yihm
 * @date 2018/11/2 下午4:39
 * @desc 一些列转换工具
 */
export default {
  timeTrans: (timeStamp) => {
    const date = new Date(timeStamp)
    const Y = date.getFullYear()
    const M = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const D = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
    const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  },

}
  
  