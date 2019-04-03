import HttpClient from '@utils/HttpClient'

const getUserList = (url = `/api/v1/users`) => {
  return HttpClient.get(url, {})
}

export default {
  getUserList
}