import HttpClient from '@utils/HttpClient'
import apiPrefix from '../index'
const getMaterialList = (url = `${apiPrefix}/materials`) => {
  return HttpClient.get(url, {}).then((data: any[]): any[] => {
    const list: any[] = []
    if (data) {
      data.forEach((item: any, key) => {
        list.push(convert(item, key))
      })
    }
    return list

  }, (err) => {
    return err
  })
}

const getMaterialDetail = (id: string, url = `${apiPrefix}/materials/`) => {
  return HttpClient.get(`${url}${id}`, {}).then(data => {
    if (data) {
      return convert(data, 0)
    } else {
      return false
    }
  })
}
const getMaterialTypes = (url = `${apiPrefix}/materials/types`) => {
  return HttpClient.get(url, {})
}
const update = (params: any, url = `${apiPrefix}/materials/`) => {
  return HttpClient.put(`${url}${params.id}`, params)
}
const deleteMaterial = (id: string, url = `${apiPrefix}/materials/`) => {
  return HttpClient.delete(`${url}${id}`, {})
}
const addMaterial = (params, url = `${apiPrefix}/materials`) => {
  return HttpClient.post(url, params)
}
const convert = (item, id) => {
  const createTime = new Date(item.createTime * 1000)
  let updateTime = ''
  if (item.updateTime.Valid && item.updateTime.Int64 !== 0) {
    updateTime = (new Date(item.updateTime.Int64 * 1000)).toLocaleDateString()
  }
  const imageList = item.images.Valid ? item.images.String.split(',') : false
  return {
    'seriesId': id,
    'name': item.name,
    'key': item.id,
    'id': item.id,
    'type': item.typeName,
    'location': item.location.Valid ? item.location.String : false,
    'provider': item.provider.Valid ? item.provider.String : false,
    'providerLink': item.providerLink.Valid ? item.providerLink.String : false,
    'owner': item.owner.name,
    'ownerId': item.owner.id,
    'images': imageList,
    'createTime': `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDay() + 1}`,
    'updateTime': updateTime !== '' ? updateTime : false,
    'updateUserName': item.updateUser.name && item.updateUser.name !== '' ? item.updateUser.name : false,
    'updateUserId': item.updateUser.id && item.updateUser.id !== '' ? item.updateUser.id : false,
    'count': item.count.Valid ? item.count.Int64 : 0,
    'price': item.price.Valid ? item.price.Float64 : 0
  }
}
export default {
  getMaterialList,
  getMaterialDetail,
  getMaterialTypes,
  update,
  deleteMaterial,
  addMaterial
}