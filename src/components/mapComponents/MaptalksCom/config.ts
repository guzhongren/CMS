const config = {
  mapOptions: {
    center: [108.93, 34.27],
    zoom: 15,
    baseLayer: {
      urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c'],
          attribution: '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
    },
    attribution: {
      'content': `&copy;${(new Date()).getFullYear()} <a target="_blank" href="https://github.com/freeCodeCamp-XiAn">cms</a>`
    }
  }
}
export default config