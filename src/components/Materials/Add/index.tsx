import React from 'react'
import './index.less'
import { Button, Breadcrumb, Form, Input, message, Select, InputNumber, Upload, Icon } from 'antd'
const Option = Select.Option
const Dragger = Upload.Dragger
import { Redirect } from 'react-router-dom'
import AdminAPI from '@api/Admin'
import { FaHome, FaBoxes, FaCartPlus, FaAsterisk } from 'react-icons/fa'
interface IState {
  isAdded?: boolean,
  name?: string,
  location?: string,
  count?: number,
  provider?: string,
  providerLink?: string,
  images?: any[],
  price?: number,
  materialTypeList?: any[],
  selectedMaterialTypeId?: string
}
export default class Add extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isAdded: false,
      price: 0
    }
    this.getMaterialTypeList()
  }
  handlerAddUser = () => {
    if (this.state.name === '') {
      message.error('物料名称为必填项！')
      return
    }
    if (this.state.name === '') {
      message.error('密码为必填项！')
      return
    }
    const params = {
      name: this.state.name,
      roleId: this.state.selectedMaterialTypeId,
      password: this.state.name
    }
    AdminAPI.User.addUser(params).then(data => {
      if (data) {
        this.setState({
          name: '',
          selectedMaterialTypeId: this.state.materialTypeList![0].id,
          provider: '',
          // repeatPassword: ''
        }, () => {
          message.success('添加用户成功！')
        })
      }
    }, () => {
      message.error('添加用户失败，请重试！')
    })
  }
  handleDraggerImages = (info) => {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
  handlePrice = (value) => {
    this.setState({
      price: value || 0
    })
  }
  handleCount = (evt) => {
    this.setState({
      count: evt.target.value || 0
    })
  }
  handleProviderLink = (evt) => {
    this.setState({
      providerLink: evt.target.value || ''
    })
  }
  handleProvider = (evt) => {
    this.setState({
      provider: evt.target.value || ''
    })
  }
  handleLocation = (evt) => {
    this.setState({
      location: evt.target.value || ''
    })
  }
  handleUserName = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }
  handleAddUser = () => {
    this.setState({
      isAdded: true
    })
  }
  getMaterialTypeList = () => {
    AdminAPI.Material.getMaterialTypes().then((roleRata: any) => {
      this.setState({
        materialTypeList: roleRata,
        selectedMaterialTypeId: roleRata[0].id
      })
    })
  }
  // getUserList = () => {
  //   AdminAPI.Material.getMaterialList().then((data: any) => {
  //     this.setState({
  //       userList: data
  //     })
  //   }, err => {
  //     console.error(err)
  //   })
  // }
  handleRoleChange = (value) => {
    this.setState({
      selectedMaterialTypeId: value || this.state.materialTypeList![0].id
    })
  }
  renderUserRoleSelect = () => {
    const materialTypeList = this.state.materialTypeList!
    const options = materialTypeList && materialTypeList.map(role => {
      return <Option key={role.id} value={role.id}>{role.name}</Option>
    })

    return (
      <Select defaultValue={materialTypeList[0].id} value={this.state.selectedMaterialTypeId} className={'userRoleSelect'} onSelect={this.handleRoleChange} >
        {options}
      </Select >
    )
  }

  render() {
    const userRoleSelect = this.state.materialTypeList && this.renderUserRoleSelect()
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
        {this.state.isAdded && <Redirect to='/admin/materials/add' />}
        {!this.state.isAdded && <div className={'userList'}>
          <div className='usersNavbar'>
            <Breadcrumb>
              <Breadcrumb.Item href='/#/'>
                <FaHome className='icon' />
              </Breadcrumb.Item>
              <Breadcrumb.Item href='/#/admin/materials'>
                <FaBoxes className='icon' />
                <span>物料</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item >
                <FaCartPlus className='icon' />
                <span>添加</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='addUserForm'>
            <Form {...formItemLayout}>
              <Form.Item
                label={<span><FaAsterisk style={{width: 8, color: 'red'}} />名称</span>}
              >
                <Input
                  placeholder='输入物料名称'
                  onChange={this.handleUserName}
                  value={this.state.name}
                />
              </Form.Item>
              <Form.Item
                label='类型'
              >
                {userRoleSelect}
              </Form.Item>
              <Form.Item
                label='存放位置'
              >
                <Input
                  placeholder='输入存放位置'
                  onChange={this.handleLocation}
                  value={this.state.location}
                />
              </Form.Item>
              <Form.Item
                label='提供者'
              >
                <Input
                  placeholder='再次输入提供者信息'
                  onChange={this.handleProvider}
                  value={this.state.provider}
                />
              </Form.Item>
              <Form.Item
                label='提供者链接'
              >
                <Input
                  placeholder='再次输入提供者链接信息'
                  onChange={this.handleProviderLink}
                  value={this.state.providerLink}
                />
              </Form.Item>
              <Form.Item
                label='数量'
              >
                <InputNumber
                  className='number'
                  placeholder='输入物料数量'
                  min={0} max={1000000} step={1}
                  onChange={this.handleCount}
                  value={this.state.count}
                />
              </Form.Item>
              <Form.Item
                label='金额'
              >
                <InputNumber
                  className='number'
                  placeholder='输入金额'
                  min={0} max={1000000} step={0.1}
                  onChange={this.handlePrice}
                  value={this.state.price}
                />
              </Form.Item>
              <Form.Item
                label='图片'
              >
                <Dragger multiple={true} onChange={this.handleDraggerImages} accept={'.jpg, .jpeg, .pdf, .png, .webp'}>
                  <p className='ant-upload-drag-icon'>
                    <Icon type='inbox' />
                  </p>
                  <p className='ant-upload-text'>点击或拖拽即可上传</p>
                  <p className='ant-upload-hint'>支持单个或批量上传。严格禁止上传公司数据或其他文件</p>
                </Dragger>
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
