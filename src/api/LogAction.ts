// @author 谷中仁
import HttpClient from '@utils/HttpClient'

interface ILoginParams {
  username: string,
  password: string
}
const Login = (params: ILoginParams, url = `api/login`) => {
  return HttpClient.post(url, params).then(data => {
    return data
  }, err => {
    console.error(err)
  })
}
export default {
  Login
}