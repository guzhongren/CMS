import apiPrefix from '../index'
import HttpClient from '@utils/HttpClient'
export default {
  upload: () => {
    return `${apiPrefix}/file/upload`
  },
  delete: (id: string) => {
    return HttpClient.delete(`${apiPrefix}/file/delete/${id}`, {})
  }
}