/**
 * 主要用来处理用户登录控制，存储, 获取和删除session
 */
const KEY = 'token'
const USERKEY = 'user'
export default {
  SetToken: (token) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(token))
  },
  GetToken: () => {
    const sessionValue = window.sessionStorage.getItem(KEY)!
    if (sessionValue) {
      return sessionValue.slice(1, -1)
    } else {
      return null
    }
  },
  
  DeleteToken: () => {
    return new Promise((resolve) => {
      window.sessionStorage.removeItem(KEY)
      resolve({ 'isDeleted': true })
    })
  },
  // ==========用户信息=========
  SetUserInfo: (userInfo) => {
    window.sessionStorage.setItem(USERKEY, JSON.stringify(userInfo))
  },
  GetUserInfo: () => {
    const sessionValue = window.sessionStorage.getItem(USERKEY)!
    if (sessionValue) {
      return JSON.parse(sessionValue.slice(1, -1).replace(/\\/g, ''))
    } else {
      return null
    }
  },
  DeleteUserInfo: () => {
    return new Promise((resolve) => {
      window.sessionStorage.removeItem(KEY)
      resolve({ 'isDeleted': true })
    })
  }
}