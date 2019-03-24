import * as React from 'react'
import './index.less'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import logo from './img/logo.png'
import Config from '@config/index'

interface IState {
  current?: string
}
export interface IProps {
  empty?: any
  height?: string
  theme?: any
  // style?: any
}
export default class NavBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      current: 'home'
    }
  }
  handleClick = (e) => {
    // console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }
  render() {
    const menuStyle = {
      height: this.props.height!,       // 自定义导航栏高度
      lineHeight: this.props.height!    // 确保在自定义高度下导航内容保持在导航条内部上下居中
    }
    return (
        <Menu theme={this.props.theme} style={menuStyle} onClick={this.handleClick} selectedKeys={[this.state.current!]} mode='horizontal'>
          <Menu.Item key='home1'>
            <NavLink  to='/'>
              <img className='logo' src={logo} alt={Config.projectName}/>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='home'>
            <NavLink  to='/'>
              <Icon type='home' />
              主页
            </NavLink>
          </Menu.Item>
          <Menu.Item key='map'>
            <NavLink  to='/map'>
              <Icon type='environment' />
              地图
            </NavLink>
          </Menu.Item>
          <Menu.Item key='demo'>
            <NavLink  to='/demo'>
              <Icon type='appstore-o'/>
              Demo示例
            </NavLink>
          </Menu.Item> 
          <Menu.Item  key='admin' >
            <NavLink to='/admin'>
            <Icon type='smile-o' />
              Admin
            </NavLink>
          </Menu.Item>
          <Menu.Item key='11'>
            <NavLink  to='/test'>
              <Icon type='smile-o' />
              404
            </NavLink>
          </Menu.Item>
        </Menu>
    )
  }
}