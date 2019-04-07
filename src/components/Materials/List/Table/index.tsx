import React from 'react'
import './index.less'
import { Table, Divider, Drawer, message, Form, Select, Button, Input, InputNumber } from 'antd'

const Option = Select.Option

import AdminAPI from '@api/Admin'
import { NavLink } from 'react-router-dom'
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
  materialInfo?: any,
  materialTypeList?: any[],
  willUpdateMaterial?: any,
  
  /**
   * 物料名称
   *
   * @type {string}
   * @memberof IState
   */
  name?: string
  /**
   * 默认被选中的角色
   *
   * @type {string}
   * @memberof IState
   */
  selectedType?: string
  /**
   * 存放地址
   *
   * @type {string}
   * @memberof IState
   */
  location?: string
  provider?: string,
  providerLink?: string,
  count?: number,
  price?: number
}

export default class UserTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: this.props.list,
      isDrawerVisible: false,
      materialInfo: null
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({
        dataSource: nextProps.list
      })
    }
  }

  handleTypeChange = (selectedValue: string) => {
    const currentUser = this.state.materialInfo
    this.setState({
      willUpdateMaterial: {
        id: currentUser.id,
        name: currentUser.name,
        roleId: selectedValue
      },
      selectedType: selectedValue
    })
  }
  // TODO： 更新物料信息
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
   * 查看物料信息
   *
   * @memberof UserTable
   */
  lookMaterialDetail(id: string) {
    AdminAPI.Material.getMaterialDetail(id).then((data: any) => {
      if (data) {
        this.setState({
          isDrawerVisible: true,
          materialInfo: data,
          name: data.name,
          location: data.location.Valid ? data.location.String : '',
          provider: data.provider.Valid ? data.provider.String : '',
          providerLink: data.providerLink.Valid ? data.providerLink.String : '',
          count: data.count.Valid ? data.count.Int64 : 0,
          price: data.price.Valid ? data.price.Float64 : 0,
        }, () => {
          AdminAPI.Material.getMaterialTypes().then((types: any) => {
            this.setState({
              materialTypeList: types
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
  renderTypeSelect = () => {
    const currentMaterial = this.state.materialInfo
    const defaultType: any = this.state.materialTypeList && this.state.materialTypeList.find((type) => {
      return type.name === currentMaterial.typeName
    })
    const options = this.state.materialTypeList && this.state.materialTypeList.map(type => {
      return <Option key={type.id} value={type.id}>{type.name}</Option>
    })

    return (
      <Select defaultValue={defaultType.id} value={this.state.selectedType || defaultType.name} className={'userRoleSelect'} onSelect={this.handleTypeChange} >
        {options}
      </Select >
    )
  }

  render() {
    const materialInfo = this.state.materialInfo!
    const userTypeSelect = materialInfo && this.state.materialTypeList && this.renderTypeSelect()
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
        <Drawer title='物料详情及更新' className='updateMaterialInfo'
          width={520}
          onClose={this.onDrawerClose}
          visible={this.state.isDrawerVisible}>
          {materialInfo && <Form {...formItemLayout}>
            <Form.Item
              label='名称'>
              <Input value={this.state.name} />
            </Form.Item>
            <Form.Item
              label='类型'>
              {userTypeSelect}
            </Form.Item>
            <Form.Item
              label='存放地址'>
              <Input value={this.state.location} />
            </Form.Item>
            <Form.Item
              label='提供者'>
              <Input value={this.state.provider} />
            </Form.Item>
            <Form.Item
              label='提供者链接'>
              <Input value={this.state.providerLink} />
            </Form.Item>
            <Form.Item
              label='数量'>
              <InputNumber value={this.state.count} className='number' placeholder='输入物料数量' min={0} max={1000000} step={1} />
            </Form.Item>
            <Form.Item
              label='金额'>
              <InputNumber value={this.state.price} className='number' placeholder='输入金额' min={0} max={1000000} step={.1} />
            </Form.Item>
            <Form.Item
              label='创建时间'>
              {(new Date(materialInfo.createTime * 1000)).toLocaleDateString()}
            </Form.Item>
            <Form.Item
              label='最后更新时间'>
              {materialInfo.updateTime.Valid && materialInfo.updateTime.Int64 !== 0 ? (new Date(materialInfo.updateTime.Int64).toLocaleDateString()) : '--'}
            </Form.Item>
            <Form.Item
              label='最后更新者'>
              {<NavLink to={'/admin/users/' + materialInfo.updateUser.id} >{materialInfo.updateUser.name}</NavLink>}
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