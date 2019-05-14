import React from 'react'
import './index.less'
import { Table, Divider, Drawer, message, Form, Select, Button } from 'antd'

const Option = Select.Option
import LoginUtils from '@utils/Login'
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
  selectDefaultValue?: string,
  willUpdateUser?: any,
  /**
   * 默认被选中的角色
   *
   * @type {string}
   * @memberof IState
   */
  selectedRoleId?: string
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

  handleRoleChange = (selectedValue: string) => {
    const currentUser = this.state.userInfo
    this.setState({
      willUpdateUser: {
        id: currentUser.id,
        name: currentUser.name,
        roleId: selectedValue
      },
      selectedRoleId: selectedValue
    })
  }
  handleUserUpdate = () => {
    AdminAPI.User.updateUser(this.state.willUpdateUser).then(data => {
      if (data) {
        this.getUserList().then(userList => {
          this.setState({
            isDrawerVisible: false,
            dataSource: userList
          })
        })
        message.info('更新成功！')
      }
    }, () => {
      message.error('更新失败，请重新尝试！')
    })
    this.setState({
      isDrawerVisible: false
    })
  }
  /**
   * 获取用户列表
   *
   * @memberof UserTable
   * @returns Promise
   */
  getUserList = () => {
    return AdminAPI.User.getUserList().then((data: any) => {
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
      return data
    }, () => {
      message.error('获取用户数据错误')
    })
  }
  onDrawerClose = () => {
    this.setState({
      isDrawerVisible: !this.state.isDrawerVisible
    })
  }
  deleteUser = (id: string) => {
    AdminAPI.User.deleteUser(id).then(data => {
      if (data) {
        message.success('删除成功！')
        this.getUserList().then(userList => {
          this.setState({
            dataSource: userList
          })
        })
      }
    }, () => {
      message.error('删除失败！')
    })
  }
  /**
   * 查看用户信息
   *
   * @memberof UserTable
   */
  lookUserDetail(id: string) {
    AdminAPI.User.getUserDetail(id).then((data: any) => {
      if (data) {
        this.setState({
          isDrawerVisible: true,
          userInfo: data,
          selectedRoleId: data.roleId
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
    const currentUser = this.state.userInfo
    const defaultRole: any = this.state.userRoleList && this.state.userRoleList.find((role) => {
      return role.name === currentUser.role
    })
    const options = this.state.userRoleList && this.state.userRoleList.map(role => {
      return <Option key={role.id} value={role.id}>{role.name}</Option>
    })
    
    return (
      <Select defaultValue={defaultRole} value={this.state.selectedRoleId || defaultRole.id} className={'userRoleSelect'} onSelect={this.handleRoleChange} >
          {options}
        </Select >
    )
  }

  render() {
    const userInfo = this.state.userInfo!
    const currentUser = LoginUtils.GetUserInfo()
    const userRoleSelect = userInfo && this.state.userRoleList && this.renderUserRoleSelect()
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
    const columns = [{
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      key: 'id',
      render: (user) => (
        <span>
          {user.id === currentUser.id || user.name === 'admin' || user.role === 'admin' || currentUser.role === 'publish' ? '更新' : <a href='javascript:;' onClick={this.lookUserDetail.bind(this, user.id)}>更新</a>}
          <Divider type='vertical' />
          {user.id === currentUser.id || user.name === 'admin' || (user.role === 'publish' && user.id === currentUser.id) ? '删除' : <a href='javascript:;' onClick={this.deleteUser.bind(this, user.id)}>删除</a> }
        </span>
      ),
    }]
    return (
      < React.Fragment >
        <Table bordered pagination={{ pageSize: 10 }} className={'userListTable'} dataSource={this.state.dataSource} columns={columns} />
        <Drawer title='详情及更新' className='updateUserInfo'
          width={520}
          onClose={this.onDrawerClose}
          visible={this.state.isDrawerVisible}>
          {userInfo && <Form {...formItemLayout}>
            <Form.Item
              label='用户名'>
              {userInfo.name}
            </Form.Item>
            <Form.Item
              label='角色'>
              {userRoleSelect}
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
              取消
            </Button>
            <Button onClick={this.handleUserUpdate} type='primary'>
              提交
            </Button>
          </div>
        </Drawer>
      </React.Fragment >
    )
  }
}