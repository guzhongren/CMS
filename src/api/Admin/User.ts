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
const updateUser = (params: any, url = 'api/v1/users/') => {
  return HttpClient.put(`${url}${params.id}`, params)
}
const deleteUser = (id: string, url= 'api/v1/users/') => {
  return HttpClient.delete(`${url}${id}`, {})
}

export default {
  getUserList,
  getUserDetail,
  getUserRoles,
  updateUser,
  deleteUser
}