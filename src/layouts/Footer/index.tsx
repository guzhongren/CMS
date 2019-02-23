import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import './index.less'
import {Layout} from 'antd'

const { Footer } = Layout

export default class BasicFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
        {/*<div className='footer-barrier' />*/}
        <div>Community Management System ©{new Date().getFullYear()} Created <FaHeart style={{color: 'red'}} /> by Zhongren Gu</div>
      </Footer>
    )
  }
}
