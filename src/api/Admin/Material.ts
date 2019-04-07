import HttpClient from '@utils/HttpClient'
import apiPrefix from '../index'
const getMaterialList = (url = `${apiPrefix}/materials`) => {
  return HttpClient.get(url, {}).then((data: any[]): any[] => {
    const list: any[] = []
    if (data) {
      data.forEach((item: any, id) => {
        const createTime = new Date(item.createTime * 1000)
        const originUpdateTime = new Date(item.createTime * 1000)
        const updateTime = item.updateTime.Valid ? `${originUpdateTime.getFullYear()}/${originUpdateTime.getMonth() + 1}/${originUpdateTime.getDay() + 1}` : false
        const imageList = item.images.Valid ? item.images.String.split(',') : false
        const temp = {
          'seriesId': id,
          'name': item.name,
          'key': item.id,
          'id': item.id,
          'type': item.typeName,
          'location': item.location.Valid ? item.location.String : '',
          'provider': item.provider.Valid ? item.provider.String : '--',
          'providerLink': item.providerLink.Valid ? item.providerLink.String : '',
          'owner': item.owner.name,
          'ownerId': item.owner.id,
          'images': imageList,
          'createTime': `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDay() + 1}`,
          'updateTime': updateTime,
          'count': item.count.Valid ? item.count.Int64 : false,
          'price': item.price.Valid ? item.price.Float64 : 0
        }
        list.push(temp)
      })
    }
    return list

  }, (err) => {
    return err
  })
}

const getMaterialDetail = (id: string, url = `${apiPrefix}/materials/`) => {
  return HttpClient.get(`${url}${id}`, {})
}
const getMaterialTypes = (url = `${apiPrefix}/materials/types`) => {
  return HttpClient.get(url, {})
}
const updateMaterial = (params: any, url = `${apiPrefix}/materials/`) => {
  return HttpClient.put(`${url}${params.id}`, params)
}
const deleteMaterial = (id: string, url = `${apiPrefix}/materials/`) => {
  return HttpClient.delete(`${url}${id}`, {})
}
const addMaterial = (params, url = `${apiPrefix}/materials`) => {
  return HttpClient.post(url, params)
}
export default {
  getMaterialList,
  getMaterialDetail,
  getMaterialTypes,
  updateMaterial,
  deleteMaterial,
  addMaterial
}