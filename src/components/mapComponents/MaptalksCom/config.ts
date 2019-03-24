const config = {
  mapOptions: {
    center: [108.89124, 34.228625],
    zoom: 15,
    baseLayer: {
      urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c'],
          attribution: '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
    },
    attribution: {
      'content': '&copy;2018 <a target="_blank" href="http://www.summit.com.cn">Summit</a>'
    }
  }
}
export default config