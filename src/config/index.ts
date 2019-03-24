
const Config = {
  projectName: 'Community Management System',
  system: {
    loadingText: '别急,努力加载ing'
  },
}


if (typeof (ConfigExt) !== 'undefined') {
  Object.assign(Config, ConfigExt)
}

export default Config