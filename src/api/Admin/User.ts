import HttpClient from '@utils/HttpClient'

const getUserList = (url = `/api/v1/users`) => {
  return HttpClient.get(url, {})
}

const getUserDetail = (id: string, url = 'api/v1/users/') => {
  return HttpClient.get(`${url}${id}`, {})
}
const getUserRoles = (url = 'api/v1/roles') => {
  return HttpClient.get(url, {})
}

export default {
  getUserList,
  getUserDetail,
  getUserRoles
}