import * as React from 'react'
// import './index.scss'
import Config from '@config/index'
import { Header, Footer } from '@layouts/index'

interface IState {
  hasMapLoaded?: boolean
}

export default class Index extends React.Component<any, IState> {
  map: any
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        {Config.projectName}
        <Footer />
      </React.Fragment>
    )
  }
}