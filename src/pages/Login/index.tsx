import React from 'react'
import './index.less'
import LoginAction from '@api/LogAction'
import {
  Form, Icon, Input, Button, message
} from 'antd'

interface IState {
  username?: string,
  password?: string
}

export default class LoginComponent extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    if (this.state.username && this.state.password) {
      const params = {
        username: this.state.username,
        password: this.state.password
      }
      LoginAction.Login(params)
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

  render() {
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
            <Button href='login' type='primary' className='loginBtn' onClick={this.handleSubmit} >登录</Button>
          </Form.Item>
        </Form>
      </div>

    )
  }
}
