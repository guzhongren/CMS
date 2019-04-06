/**
 * 主要用来处理用户登录控制，存储, 获取和删除session
 */
const KEY = 'token'
export default {
  SetLoginState: (userInfo) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(userInfo))
  },
  GetLoginState: () => {
    const sessionValue = window.sessionStorage.getItem(KEY)!
    if (sessionValue) {
      return sessionValue.slice(1, -1)
    } else {
      return null
    }
  },
  DeleteLoginState: () => {
    return new Promise((resolve) => {
      window.sessionStorage.removeItem(KEY)
      resolve({ 'isDeleted': true })
    })
  }
}