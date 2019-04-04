import React from 'react'
import './index.less'
import { Table, Divider, Drawer, message, Form, Select, Button } from 'antd'

const Option = Select.Option

import AdminAPI from '@api/Admin'
interface IProps {
  list?: any[]
}

interface IState {
  dataSource?: any[],
  /**
   * 查看用户详情的抽屉是否可见
   *
   * @type {boolean}
   * @memberof IState
   */
  isDrawerVisible?: boolean,
  /**
   * 用户信息
   *
   * @type {*}
   * @memberof IState
   */
  userInfo?: any,
  userRoleList?: any[],
  selectDefaultValue?: string
}

export default class UserTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: this.props.list,
      isDrawerVisible: false,
      userInfo: null
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({
        dataSource: nextProps.list
      })
    }
  }
  handleUserUpdate = () => {
    // TODO: 保存用户最新信息
    this.setState({
      isDrawerVisible: false
    })
  }
  onDrawerClose = () => {
    this.setState({
      isDrawerVisible: !this.state.isDrawerVisible
    })
  }
  /**
   * 查看用户信息
   *
   * @memberof UserTable
   */
  lookUserDetail (id: string) {
    AdminAPI.User.getUserDetail(id).then((data: any) => {
      if (data) {
        this.setState({
          isDrawerVisible: true,
          userInfo: data
        }, () => {
          AdminAPI.User.getUserRoles().then((roleRata: any) => {
            this.setState({
              userRoleList: roleRata
            })
          })
        })
      }
    }, () => {
      message.error('没有该用户信息，请重新查询！')
    })
  }
  /**
   * 渲染用户角色下拉框
   *
   * @memberof UserTable
   */
  renderUserRoleSelect = () => {
    // const currentUser = this.state.userInfo
    // const defaultValue = this.state.userRoleList && this.state.userRoleList.find((role) => {
    //     return role.name === currentUser.role
    //   }).id
     
    const options = this.state.userRoleList && this.state.userRoleList.map(role => {
      return <Option key={role.id} value={role.id}>{role.name}</Option>
    })
    return(
      <Select defaultValue={1} className={'userRoleSelect'} >
        <Option  value={1}>test</Option>
        {options}
      </Select >
    )
  }

  render() {
    const userInfo = this.state.userInfo!
    const userRoleSelect = this.renderUserRoleSelect()
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span:                       24 },
        sm: { span:                       16 },
      },
    }
    const columns = [{
      title:                       '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title:                       '角色',
      dataIndex: 'role',
      key: 'role',
    }, {
      title:                       '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title:                       '操作',
      key: 'id',
      render: (user) => (
        <span>
          <a href='javascript:;' id='' onClick={this.lookUserDetail.bind(this, user.id)}>更新</a>
          <Divider type='vertical' />
          <a href='javascript:;'>删除</a>
        </span>
      ),
    }]
    return (
      < React.Fragment >
        <Table bordered pagination={{ pageSize: 10 }} className={'userListTable'} dataSource={this.state.dataSource} columns={columns} />
        <Drawer title='用户详情' className='updateUserInfo'
          width={520}
          onClose={this.onDrawerClose}
          visible={this.state.isDrawerVisible}>
          {userInfo && <Form {...formItemLayout}>
            <Form.Item
              label='用户名'>
              { userInfo.name}
            </Form.Item>
            <Form.Item
              label='角色'>
            {userInfo && this.state.userRoleList && userRoleSelect}
            </Form.Item>
            <Form.Item
              label='创建时间'>
              {(new Date(userInfo.createTime * 1000)).toLocaleDateString()}
            </Form.Item>
            </Form>}
            <div className='userUpdateFooter'>
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onDrawerClose}
            >
              Cancel
            </Button>
            <Button onClick={this.handleUserUpdate} type='primary'>
              Submit
            </Button>
            </div>
        </Drawer>
      </React.Fragment >
    )
  }
}