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
    this.setState({
      selectedType: selectedValue
    })
  }
  handleMaterialUpdate = () => {
    this.setState({
      willUpdateMaterial: {
        id: this.state.materialInfo.id,
        name: this.state.name,
        type: this.state.selectedType,
        location: this.state.location,
        provider: this.state.provider,
        providerLink: this.state.providerLink,
        count: this.state.count,
        price: this.state.price,
      }
    }, () => {
      AdminAPI.Material.update(this.state.willUpdateMaterial!).then(result => {
        if (result) {
          AdminAPI.Material.getMaterialList().then((data: any) => {
            this.setState({
              isDrawerVisible: false,
              dataSource: data
            }, () => {
                this.setState({
                  isDrawerVisible: false
                })
              message.success('更新成功！')
            })
          }, err => {
            console.error(err)
          })
          
        }
      })
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
          location: data.location,
          provider: data.provider,
          providerLink: data.providerLink,
          count: data.count ? data.count : 0,
          price: data.price ? data.price : 0,
        }, () => {
          AdminAPI.Material.getMaterialTypes().then((types: any) => {
            const currentMaterial = this.state.materialInfo
            this.setState({
              materialTypeList: types,
              selectedType: types.find((type) => {
                return type.name === currentMaterial.type
              }).id
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
    // const currentMaterial = this.state.materialInfo
    // const defaultType: any = this.state.materialTypeList && this.state.materialTypeList.find((type) => {
    //   return type.name === currentMaterial.type
    // })
    const options = this.state.materialTypeList && this.state.materialTypeList.map(type => {
      return <Option key={type.id} value={type.id}>{type.name}</Option>
    })

    return (
      <Select defaultValue={this.state.selectedType} value={this.state.selectedType } className={'userRoleSelect'} onSelect={this.handleTypeChange} >
        {options}
      </Select >
    )
  }
  handlePrice = (value) => {
    this.setState({
      price: value
    })
  }
  handleCount = (value) => {
    this.setState({
      count: value
    })
  }
  handleProviderLink = (evt) => {
    this.setState({
      providerLink: evt.target.value
    })
  }
  handleProvider = (evt) => {
    this.setState({
      provider: evt.target.value
    })
  }
  handleLocation = (evt) => {
    this.setState({
      location: evt.target.value
    })
  }
  handleName = (evt) => {
    this.setState({
      name: evt.target.value
    })
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
        title: '最后更新者',
        key: 'updateUser',
        render: (info) => (
          info.updateTime ? <NavLink to={'/admin/users/' + info.updateUserId} >{info.updateUserName}</NavLink> : '--'
        )
      }, {
        title: '最后更新时间',
        // dataIndex: 'updateTime',
        key: 'updateTime',
        render: (info) => (
          info.updateTime ? info.updateTime : '--'
        )
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
              <Input value={this.state.name} onChange={this.handleName} />
            </Form.Item>
            <Form.Item
              label='类型'>
              {userTypeSelect}
            </Form.Item>
            <Form.Item
              label='存放地址'>
              <Input value={this.state.location} onChange={this.handleLocation}/>
            </Form.Item>
            <Form.Item
              label='提供者'>
              <Input value={this.state.provider} onChange={this.handleProvider}/>
            </Form.Item>
            <Form.Item
              label='提供者链接'>
              <Input value={this.state.providerLink} onChange={this.handleProviderLink}/>
            </Form.Item>
            <Form.Item
              label='数量'>
              <InputNumber value={this.state.count} onChange={this.handleCount} className='number' placeholder='输入物料数量' min={0} max={1000000} step={1} />
            </Form.Item>
            <Form.Item
              label='金额(￥)'>
              <InputNumber value={this.state.price} onChange={this.handlePrice} className='number' placeholder='输入金额' min={0} max={1000000} step={.1} />
            </Form.Item>
            <Form.Item
              label='创建时间'>
              {materialInfo.createTime}
            </Form.Item>
            <Form.Item
              label='最后更新时间'>
              {materialInfo.updateTime ? materialInfo.updateTime : '--'}
            </Form.Item>
            <Form.Item
              label='最后更新者'>
              {materialInfo.updateTime ? <NavLink to={'/admin/users/' + materialInfo.updateUserId} >{materialInfo.updateUserName}</NavLink> : '--'}
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