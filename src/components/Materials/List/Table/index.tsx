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
  handleMaterialUpdate = () => {
    AdminAPI.Material.getMaterialList().then((data: any) => {
      this.setState({
        isDrawerVisible: false,
        dataSource: data
      }, () => {
        message.success('更新成功！')
      })
    }, err => {
      console.error(err)
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
  getMaterialList = () => {
    return AdminAPI.Material.getMaterialList().then((data: any) => {
      return data
    }, () => {
      message.error('获取物料列表错误')
    })
  }
  onDrawerClose = () => {
    this.setState({
      isDrawerVisible: !this.state.isDrawerVisible
    })
  }
  deleteMaterial = (id: string) => {
    AdminAPI.Material.deleteMaterial(id).then(data => {
      if (data) {
        // const materialList = this.state.dataSource!.map(material => {
        //   return material.id !== id
        // })
        // this.setState({
        //   dataSource: materialList
        // }, () => {
        //     message.success('删除成功！')
        // })
        this.getMaterialList().then(materialList => {
          this.setState({
            dataSource: materialList
          }, () => {
              message.success('删除成功！')
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
  lookMaterialDetail(id: string) {
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
    const columns = [
      {
        title: '序号',
        dataIndex: 'seriesId',
        key: 'seriesId',
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: '存放位置',
        dataIndex: 'location',
        key: 'location',
      }, {
        title: '提供者',
        dataIndex: 'provider',
        key: 'provider',
      }, {
        title: '存入时间',
        dataIndex: 'createTime',
        key: 'createTime',
      }, {
        title: '最后更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      }, {
        title: '所属用户',
        dataIndex: 'owner',
        key: 'owner',
      }, {
        title: '图片',
        key: 'images',
        render: (imageList) => (
          < span > <a href='javascript:;' id='' onClick={this.lookMaterialDetail.bind(this, imageList)}>查看</a></span >
        )
      }, {
        title: '数量',
        dataIndex: 'count',
        key: 'count',   
      }, {
        title: '金额',
        dataIndex: 'price',
        key: 'price',   
      }, {
        title: '操作',
        key: 'id',
        render: (material) => (
          <span>
            <a href='javascript:;' id='' onClick={this.lookMaterialDetail.bind(this, material.id)}>更新</a>
            <Divider type='vertical' />
            <a href='javascript:;' onClick={this.deleteMaterial.bind(this, material.id)}>删除</a>
          </span>
        ),   
      }]
    return (
      < React.Fragment >
        {this.state.dataSource && <Table bordered pagination={{ pageSize: 10 }} className={'materialListTable'} dataSource={this.state.dataSource} columns={columns} />}
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
              Cancel
            </Button>
            <Button onClick={this.handleMaterialUpdate} type='primary'>
              Submit
            </Button>
          </div>
        </Drawer>
      </React.Fragment >
    )
  }
}