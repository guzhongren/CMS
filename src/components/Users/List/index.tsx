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
      console.log(data)
      data = data.map((item: any) => {
        const utcTime = new Date(item.createTime)
        return {
          'createTime': `${utcTime.getFullYear()}-${utcTime.getMonth() + 1}-${utcTime.getDay()}`,
          'id': item.id,
          'loginTime': item.loginTime,
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
        <div className='addUser'><Button type='primary' href='/admin/users'>新增用户</Button></div>
        <div className='userTable'><Table list={this.state.userList}/></div>
      </div>
    )
  }
}
