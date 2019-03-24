import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Pages from '@pages/index'

import './index.less'
ReactDOM.render(
  <Pages />,
  document.getElementById('root') as HTMLElement
)
declare var module: any
if (module.hot) {
  module.hot.accept()
}
