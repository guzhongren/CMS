import React from 'react'
import './index.less'
import Table from './Table'
import { Button, Breadcrumb } from 'antd'
import { Redirect } from 'react-router-dom'
import AdminAPI from '@api/Admin'
import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa'
interface IState {
  userList?: any[],
  isAddUser?: boolean
}
export default class UserList extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userList: [],
      isAddUser: false
    }
    this.getUserList()
  }

  handleAddUser = () => {
    this.setState({
      isAddUser: true
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

  render() {
    return (
      <React.Fragment>
        {this.state.isAddUser && <Redirect to='/admin/users/add'/>}
        {!this.state.isAddUser && <div className={'userList'}>
          <div className='usersNavbar'>
            <Breadcrumb>
              <Breadcrumb.Item href='/'>
                <FaHome className='icon' />
              </Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/users'>
                <FaUsers className='icon' />
                <span>用户</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Button type='primary' onClick={this.handleAddUser} ><FaUserPlus className='icon' />新增用户</Button>
          </div>
          <div className='userTable'><Table list={this.state.userList} /></div>
        </div>}
        }
      </React.Fragment>
    )
  }
}
