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

interface IFile {
  [key: string]: string
}
interface IState {
  isAdded?: boolean,
  name?: string,
  location?: string,
  count?: number,
  provider?: string,
  providerLink?: string,
  uploadedImages?: IFile,
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
      uploadedImages: {},
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
        const uploadedArr: string[] = []
        const uploadedImagesObj = this.state.uploadedImages
        for (const key in uploadedImagesObj) {
          if (uploadedImagesObj[key]) {
            uploadedArr.push(uploadedImagesObj[key])
          }
        }
        values.images = uploadedArr.join(',')
        AdminAPI.Material.addMaterial(values).then(data => {
          if (data) {
            this.setState({
              isAdded: true
            }, () => {
                message.success('上传成功！')
            })
          }
        })
      } else {
        message.error('参数错误，请重新填写！')
      }
    })
  }
  handleRemoveUploadImage = (file) => {
    const before = this.state.uploadedImages!
    AdminAPI.File.delete(before[file.name]).then(data => {
      if (data) {
        delete before[file.name]
        this.setState({
          uploadedImages: before
        })
      }
    })
  }
  handleUploadImage = (info) => {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      const before = this.state.uploadedImages!
      before[info.file.name] = info.file.response.result[0]
      const current = before
      this.setState({
        uploadedImages: current
      })
      message.success(`图片${info.file.name} 上传成功.`)
    } else if (status === 'error') {
      message.error(`图片${info.file.name} 上传失败.`)
    }
  }
  /**
   * 获取物料类型
   *
   * @memberof AddComp
   */
  getMaterialTypeList = () => {
    AdminAPI.Material.getMaterialTypes().then((roleRata: any) => {
      this.setState({
        materialTypeList: roleRata,
        selectedMaterialTypeId: roleRata[0].id
      })
    })
  }
  renderMaterialTypesSelect = () => {
    const { getFieldDecorator } = this.props.form
    const materialTypeList = this.state.materialTypeList!
    const options = materialTypeList && materialTypeList.map(role => {
      return <Option key={role.id} value={role.id}>{role.name}</Option>
    })
    return (
      <Form.Item
        label='类型'>
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择物料类型' }],
        })(
          <Select value={materialTypeList[0].id} className={'userRoleSelect'} >
            {options}
          </Select >
        )}
      </Form.Item>
    )
  }


  render() {
    const materialTypesSelect = this.state.materialTypeList && this.renderMaterialTypesSelect()
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
        {this.state.isAdded && <Redirect to='/admin/materials' />}
        {!this.state.isAdded && <div className={'materialList'}>
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
          <div className='addMaterialForm'>
            <Form onSubmit={this.handlerAddMaterial} {...formItemLayout}>

              <Form.Item
                label='名称'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input name='name' placeholder='输入物料名称' />
                )}
              </Form.Item>
              { materialTypesSelect}
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
                  <Upload.Dragger name='images' multiple action={AdminAPI.File.upload()} accept='.jpg,.jpeg,.png,.webp' onRemove={this.handleRemoveUploadImage} onChange={this.handleUploadImage}>
                    <p className='ant-upload-drag-icon'>
                      <Icon type='inbox' />
                    </p>
                    <p className='ant-upload-text'>点击或拖拽进行添加</p>
                    <p className='ant-upload-hint'>支持单文件或多文件上传</p>
                  </Upload.Dragger>
                )}
              </Form.Item>
              <Form.Item className='btn'>
                <Button type='primary' htmlType='submit' className='createUser'>确认</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        }
      </React.Fragment>
    )
  }
}



export default Form.create<IProps>({})(AddComp)
