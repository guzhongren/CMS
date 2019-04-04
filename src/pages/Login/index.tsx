import React from 'react'
import './index.less'
import LoginAction from '@api/LogAction'
import LoginUtils from '@utils/Login'
import {
  Form, Icon, Input, Button, message
} from 'antd'
import { Redirect } from 'react-router-dom'

interface IState {
  username?: string,
  password?: string,
  isLogin?: boolean
}

export default class LoginComponent extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: false
    }
  }
  componentDidMount() {
    const loginStatus = LoginUtils.GetLoginState()
    if (loginStatus) {
      this.setState({
        isLogin: true
      })
    } else {
      this.setState({
        isLogin: false
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.username && this.state.password) {
      const params = {
        name: this.state.username,
        password: this.state.password
      }
      LoginAction.Login(params).then((data: any) => {
        if (data) {
          LoginUtils.SetLoginState(data.token)
          this.setState({
            isLogin: true
          })
        } else {
          message.error('网络错误，请检查网络！')
        }
      }, err => {
        console.error(err)
        message.error('用户名或密码错误')
      })
    } else {
      message.error('用户名或密码不能为空！')
    }
  }
  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  // 登录面板
  LoginForm = () => {
    return (
      <div className='loginContainer'>
        <Form className='loginForm'>
          <Form.Item>
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' onChange={this.handleUsername} />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' onChange={this.handlePassword} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' className='loginBtn' onClick={this.handleSubmit} >登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  render() {
    const loginForm  = this.LoginForm()
    if (this.state.isLogin) {
      return(
        <Redirect to='/admin' />
      )
    } else {
      return loginForm
    }
  }
}
