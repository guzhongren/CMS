import React from 'react'
import './index.less'
import { Button, Breadcrumb, Form, Input, message, Select, InputNumber, Upload, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const Option = Select.Option
import { Redirect } from 'react-router-dom'
import AdminAPI from '@api/Admin'
import { FaHome, FaBoxes, FaCartPlus } from 'react-icons/fa'

interface IProps extends FormComponentProps {
  name?: string,
  location?: string,
  count?: number,
  provider?: string,
  providerLink?: string,
  images?: any[],
  price?: number,
  materialTypeList?: any[],
  type?: number
}
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
  selectedMaterialTypeId?: number
}
class AddComp extends React.Component<IProps, IState> {
  upLoader: any
  constructor(props: any) {
    super(props)
    this.state = {
      isAdded: false,
      location: '',
      count: 0,
      provider: '',
      providerLink: '',
      images: [],
      price: 0
    }
    this.upLoader = React.createRef()
    this.getMaterialTypeList()
  }
  handlerAddMaterial = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      
      } else {
        message.error('上传物料失败, 请重试！')
      }
    })
  }
  handleUploadImage = (info) => {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      console.log(info)
      message.success(`${info.file.name} 上传成功.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败.`)
    }
  }
  getMaterialTypeList = () => {
    AdminAPI.Material.getMaterialTypes().then((roleRata: any) => {
      this.setState({
        materialTypeList: roleRata,
        selectedMaterialTypeId: roleRata[0].id
      })
    })
  }
  renderMaterialTypesSelect = () => {
    const materialTypeList = this.state.materialTypeList!
    const options = materialTypeList && materialTypeList.map(role => {
      return <Option key={role.id} value={role.id}>{role.name}</Option>
    })
    return (
      <Select defaultValue={materialTypeList[0].id} value={materialTypeList[0].id} className={'userRoleSelect'} >
        {options.map(option => {
          return option
        })}
      </Select >
    )
  }


  render() {
    // const materialTypesSelect = this.state.materialTypeList && this.renderMaterialTypesSelect()
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
    const { getFieldDecorator } = this.props.form
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
            <Form onSubmit={this.handlerAddMaterial} {...formItemLayout}>

              <Form.Item
                label='名称'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input name='name' placeholder='输入物料名称' />
                )}
              </Form.Item>
              <Form.Item
                label='类型'>
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择物料类型' }],
                })(
                  <Select placeholder='Please select a country'>
                    <Option value='1'>China</Option>
                    <Option value='2'>U.S.A</Option>
                  </Select>
                  // { materialTypesSelect}
                )}

              </Form.Item>
              <Form.Item
                label='存放位置'
              >
                {getFieldDecorator('location', {
                  rules: [{ required: false, message: '输入存放位置!' }],
                })(
                  <Input name='location' placeholder='输入存放位置' />
                )}
              </Form.Item>
              <Form.Item
                label='提供者'
              >
                {getFieldDecorator('provider', {
                  rules: [{ required: false, message: '输入提供者信息!' }],
                })(
                  <Input name='provider' placeholder='输入提供者信息' />
                )}
              </Form.Item>
              <Form.Item
                label='提供者链接'
              >
                {getFieldDecorator('providerLink', {
                  rules: [{ required: false, message: '输入提供者信息!' }],
                })(
                  <Input name='providerLink' placeholder='输入提供者信息' />
                )}
              </Form.Item>
              <Form.Item

                label='数量'
              >
                {getFieldDecorator('count', {
                  rules: [{ required: false, message: '输入物料数量!' }],
                })(
                  <InputNumber name='count' className='number' placeholder='输入物料数量' min={0} max={1000000} step={1} />
                )}
              </Form.Item>
              <Form.Item
                label='金额'
              >
                {getFieldDecorator('price', {
                  rules: [{ required: false, message: '输入金额!' }],
                })(
                  <InputNumber className='number 1' placeholder='输入金额' min={0} max={1000000} step={0.1} />
                )}
              </Form.Item>
              <Form.Item
                label='图片'
              >
                {getFieldDecorator('images', {
                  rules: [{ required: false, message: '输入金额!' }],
                })(
                  // <input type='file' id='images' name='images' multiple accept='.jpg,.jpeg,.png,.webp' ref={this.upLoader} />
                  <Upload.Dragger name='images' multiple action={AdminAPI.File.upload()} accept='.jpg,.jpeg,.png,.webp' onChange={this.handleUploadImage}>
                    <p className='ant-upload-drag-icon'>
                      <Icon type='inbox' />
                    </p>
                    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                    <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                )}
              </Form.Item>
              <Form.Item className='btn'>
                <Button type='primary' htmlType='submit' className='createUser'>确认</Button>
              </Form.Item>
            </Form>
            {/* <Form {...formItemLayout}>
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
                <input type='file' id='images' multiple accept='.jpg,.jpeg,.png,.webp' ref={this.upLoader} onChange={this.handleUploadImages}/>
              </Form.Item>
              <Form.Item className='btn'>
                <Button type='primary' className='createUser' onClick={this.handlerAddMaterial}>确认</Button>
              </Form.Item>
            </Form> */}
          </div>
        </div>
        }
      </React.Fragment>
    )
  }
}



export default Form.create<IProps>({})(AddComp)
