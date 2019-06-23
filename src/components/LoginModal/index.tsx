import React, {Component} from 'react'
import './index.less'
import { Modal, Form, Icon, Input, Button, message } from 'antd'
import LoginAction from '@api/LogAction'
import LoginUtils from '@utils/Login'
interface IProps {
  isVisible?: boolean
  onLogin: (isLogin: boolean) => void
}

interface IStates {
  isLogin?: boolean,
  isModalVisible?: boolean,
  username?: string,
  password?: string
}
export default class LoginModal extends Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLogin: false,
      isModalVisible: this.props.isVisible
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.isVisible !== this.props.isVisible) {
      this.setState({
        isModalVisible: nextProps.isVisible
      })
    }
  }
  handleLoginCancel = () => {
    this.setState({
      isModalVisible: false
    }, () => {
      this.props.onLogin(false)
    })

  }
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    }, () => {
      this.props.onLogin(false)
    })
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
          LoginUtils.SetToken(data.token)
          LoginUtils.SetUserInfo(JSON.stringify(data.userInfo))
          this.setState({
            isLogin: true
          }, () => {
            this.props.onLogin(true)
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
  render() {
    return (
      <Modal title={'用户登录'} visible={this.state.isModalVisible} footer = {null}
        onCancel={this.handleLoginCancel}>
          <Form className='loginForm'>
            <Form.Item>
              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' onChange={this.handleUsername} />
            </Form.Item>
            <Form.Item>
              <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' onChange={this.handlePassword} />
            </Form.Item>
            <Form.Item>
            <Button className='loginBtn' onClick={this.handleCancel} >取消</Button>
            <Button type='primary' className='loginBtn' onClick={this.handleSubmit} >登录</Button>
            </Form.Item>
          </Form>
      </Modal>
    )
  }
}