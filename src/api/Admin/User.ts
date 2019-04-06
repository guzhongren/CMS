import HttpClient from '@utils/HttpClient'
import apiPrefix from '../index'
const getUserList = (url = `/api/v1/users`) => {
  return HttpClient.get(url, {})
}

const getUserDetail = (id: string, url = `${apiPrefix}users/`) => {
  return HttpClient.get(`${url}${id}`, {})
}
const getUserRoles = (url = 'api/v1/roles') => {
  return HttpClient.get(url, {})
}
const updateUser = (params: any, url = `${apiPrefix}users/`) => {
  return HttpClient.put(`${url}${params.id}`, params)
}
const deleteUser = (id: string, url = `${apiPrefix}users/`) => {
  return HttpClient.delete(`${url}${id}`, {})
}
const addUser = (params, url = `${apiPrefix}users`) => {
  return HttpClient.post(url, params)
}
const resetPassword = (params: any) => {
  return HttpClient.put(`${apiPrefix}${params.id}/resetPassword`, params)
}
export default {
  getUserList,
  getUserDetail,
  getUserRoles,
  updateUser,
  deleteUser,
  addUser,
  resetPassword
}