// @author 谷中仁
import HttpClient from '@utils/HttpClient'

interface ILoginParams {
  name: string,
  password: string
}
const Login = (params: ILoginParams, url = `/api/v1/login`) => {
  return HttpClient.post(url, params).then(data => {
    return data
  }, err => {
    console.error(err)
  })
}
export default {
  Login
}