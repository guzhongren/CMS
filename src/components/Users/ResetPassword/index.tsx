import React from 'react'
import './index.less'
import { Button, Breadcrumb, Form, Input, message} from 'antd'
import { Redirect } from 'react-router-dom'
import AdminAPI from '@api/Admin'
import LoginUtils from '@utils/Login'
import { FaHome, FaUsers, FaKey } from 'react-icons/fa'
interface IState {
  password?: string,
  repeatPassword?: string,
  isDeleted?: boolean
}
export default class Add extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isDeleted: false
    }
  }
  handlePassword1 = (evt) => {
    this.setState({
      repeatPassword: evt.target.value
    })
  }
  handlePassword = (evt) => {
    this.setState({
      password: evt.target.value
    })
  }
  handleResetPassword = () => {
    if (this.state.password === '' ) {
      message.error('密码无效！')
      return
    }
    if (this.state.repeatPassword === '') {
      message.error('密码无效！')
      return
    }
    const userInfo = JSON.parse(LoginUtils.GetUserInfo()!)
    const params = {
      id: userInfo.id,
      password: this.state.password
    }
    AdminAPI.User.resetPassword(params).then(data => {
      if (data) {
        LoginUtils.DeleteToken().then(() => {
          this.setState({
            isDeleted: true
          }, () => {
            message.success('更新密码成功！请使用新密码登录')
          })
        })
      }
    }, () => {
      message.error('更新密码失败！')
    })
  }
  
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <React.Fragment>
        {this.state.isDeleted && <Redirect to='/#/login'/>}
        <div className={'resetPassword'}>
          <div className='usersNavbar'>
            <Breadcrumb>
              <Breadcrumb.Item href='/#/'>
                <FaHome className='icon' />
              </Breadcrumb.Item>
              <Breadcrumb.Item href='/#/admin/users'>
                <FaUsers className='icon' />
                <span>用户</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item >
                <FaKey className='icon' />
                <span>修改密码</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='resetPasswordForm'>
            <Form {...formItemLayout}>
              <Form.Item
                label='密码'
              >
                <Input
                  type='password'
                  placeholder='输入密码'
                  prefix={<FaKey style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.handlePassword}
                  value={this.state.password}
                />
              </Form.Item>
              <Form.Item
                label='确认密码'
              >
                <Input
                  type='password'
                  placeholder='再次输入密码'
                  prefix={<FaKey style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.handlePassword1}
                  value={this.state.repeatPassword}
                />
              </Form.Item>
              <Form.Item className='btn'>
                <Button type='primary' className='updatePassword' onClick={this.handleResetPassword}>确认</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
