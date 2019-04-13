/**
 * 主要用来处理用户登录控制，存储, 获取和删除session
 */
const KEY = 'token'
const USERKEY = 'user'
export default {
  SetToken: (token) => {
    setCookies(KEY, JSON.stringify(token), 3)
  },
  GetToken: () => {
    return getCookies(KEY)
  },
  
  DeleteToken: () => {
    setCookies(KEY, '', -1)
  },
  SetUserInfo: (userInfo) => {
    setCookies(USERKEY, JSON.stringify(userInfo), 3)
  },
  GetUserInfo: () => {
    return getCookies(USERKEY)
  },
  DeleteUserInfo: () => {
    setCookies(USERKEY, '', -1)
  }
}

const setCookies = (key, value, expireDays) => {
  const date = new Date()
  date.setDate(date.getDate() + expireDays)
  document.cookie = key + '=' + escape(value) +
    ((expireDays === null) ? '' : ';expires=' + date.toUTCString())
}

const getCookies = (key) => {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(key + '=')
    if (cStart !== -1) {
      cStart = cStart + key.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) { cEnd = document.cookie.length }
      return JSON.parse(unescape(document.cookie.substring(cStart, cEnd)))
    }
  }
  return false
}



