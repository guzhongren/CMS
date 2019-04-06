import React from 'react'
import './index.less'
import { Button, Breadcrumb, Form, Input, message, Select } from 'antd'
const Option = Select.Option
import { Redirect } from 'react-router-dom'
import AdminAPI from '@api/Admin'
import { FaHome, FaUsers, FaUserPlus, FaKey } from 'react-icons/fa'
interface IState {
  userList?: any[],
  isAddUser?: boolean,
  userName?: string,
  password?: string,
  repeatPassword?: string,
  userRoleList?: any[],
  selectedRoleId?: string
}
export default class Add extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userList: [],
      isAddUser: false
    }
    this.getUserList()
    this.getRoleList()
  }
  handlerAddUser = () => {
    if (this.state.userName === '') {
      message.error('用户名为必填项！')
      return 
    }
    if (this.state.password === '') {
      message.error('密码为必填项！')
      return
    }
    if (this.state.repeatPassword === '' || this.state.password !== this.state.repeatPassword) {
      message.error('密码需一致！')
      return
    }
    const params = {
      name: this.state.userName,
      roleId: this.state.selectedRoleId,
      password: this.state.password
    }
    AdminAPI.User.addUser(params).then(data => {
      if (data) {
        this.setState({
          userName: '',
          selectedRoleId: this.state.userRoleList![0].id,
          password: '',
          repeatPassword: ''
        }, () => {
          message.success('添加用户成功！')
        })
      }
    }, () => {
      message.error('添加用户失败，请重试！')
    })
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
  handleUserName = (evt) => {
    this.setState({
      userName: evt.target.value
    })
  }
  handleAddUser = () => {
    this.setState({
      isAddUser: true
    })
  }
  getRoleList = () => {
    AdminAPI.User.getUserRoles().then((roleRata: any) => {
      this.setState({
        userRoleList: roleRata,
        selectedRoleId: roleRata[0].id
      })
    })
  }
  getUserList = () => {
    AdminAPI.User.getUserList().then((data: any) => {
      data = data.map((item: any) => {
        const createTime = new Date(item.createTime * 1000)
        const loginTime = new Date(item.loginTime * 1000)
        return {
          'key': item.id,
          'createTime': `${createTime.getFullYear()}/${createTime.getMonth() + 1}/${createTime.getDay() + 1}`,
          'id': item.id,
          'loginTime': `${loginTime.getFullYear()}/${loginTime.getMonth() + 1}/${loginTime.getDay() + 1}`,
          'name': item.name,
          'role': item.role
        }
      })
      this.setState({
        userList: data
      })
    }, err => {
      console.error(err)
    })
  }
  handleRoleChange = (value) => {
    this.setState({
      selectedRoleId: value || this.state.userRoleList![0].id
    })
  }
  renderUserRoleSelect = () => {
    const userRoleList = this.state.userRoleList!
    const options = userRoleList && userRoleList.map(role => {
      return <Option key={role.id} value={role.id}>{role.name}</Option>
    })

    return (
      <Select defaultValue={userRoleList[0].id} value={this.state.selectedRoleId} className={'userRoleSelect'} onSelect={this.handleRoleChange} >
        {options}
      </Select >
    )
  }

  render() {
    const userRoleSelect = this.state.userRoleList && this.renderUserRoleSelect()
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
        {this.state.isAddUser && <Redirect to='/admin/users/add' />}
        {!this.state.isAddUser && <div className={'userList'}>
          <div className='usersNavbar'>
            <Breadcrumb>
              <Breadcrumb.Item href='/#/admin'>
                <FaHome className='icon' />
              </Breadcrumb.Item>
              <Breadcrumb.Item href='/#/admin/users'>
                <FaUsers className='icon' />
                <span>用户</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item >
                <FaUserPlus className='icon' />
                <span>添加</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='addUserForm'>
            <Form {...formItemLayout}>
              <Form.Item
                label='用户名'
              >
                <Input
                  placeholder='输入用户名'
                  prefix={<FaUserPlus style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.handleUserName}
                  value= {this.state.userName}
                />
              </Form.Item>
              <Form.Item
                label='角色'
              >
                {userRoleSelect}
              </Form.Item>
              <Form.Item
                label='密码'
              >
                <Input
                  type='password'
                  placeholder='输入密码'
                  prefix={<FaKey style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.handlePassword}
                  value= {this.state.password}
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
                <Button type='primary' className='createUser' onClick={this.handlerAddUser}>确认</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        }
      </React.Fragment>
    )
  }
}
