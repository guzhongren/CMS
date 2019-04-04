import React from 'react'
import './index.less'
import Table from './Table'
import {Button} from 'antd'

import AdminAPI from '@api/Admin'

interface IState {
  userList: any[]
}
export default class UserList extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userList: []
    }
    this.getUserList()
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
      <div className={'userList'}>
        <div className='addUser'><Button type='primary'>新增用户</Button></div>
        <div className='userTable'><Table list={this.state.userList}/></div>
      </div>
    )
  }
}
