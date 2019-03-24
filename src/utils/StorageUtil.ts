/**
 * 对需要5m左右数据在网络数据库进行持久保存
 */
export default {
  setLocalStorage: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  getLocalStorage: (key) => {
    return JSON.parse(window.localStorage.getItem(key)!)
  },
  delLocalStorage: (key) => {
    return new Promise((resolve) => {
      window.localStorage.removeItem(key)
      resolve({ 'isDeleted': true })
    })
  },
  delAllLocalStorage: () => {
    return new Promise((resolve) => {
      window.localStorage.clear()
      resolve({ 'isDeleted': true })
    })
  }
}