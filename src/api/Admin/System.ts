import apiPrefix from '../index'
import HttpClient from '@utils/HttpClient'
export default {
  statistic: () => {
    return HttpClient.get(`${apiPrefix}/statistic`, {})
  }
}