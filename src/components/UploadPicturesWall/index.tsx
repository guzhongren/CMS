import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import './index.less'
import AdminAPI from '@api/Admin'
import apiPrefix from '@api/index'

interface IIamge {
  uid: string,
  size: number,
  url: string,
  name: string,
  type: string,
}
interface IProps {
  fileList: IIamge[],
  onChange?: (fileList) => void
}

interface IState {
  previewVisible?: boolean,
  previewImage?: string,
  fileList?: IIamge[]
}

export default class PicturesWall extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: this.props.fileList
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.fileList !== this.state.fileList) {
      this.setState({
        fileList: nextProps.fileList
      })
    }
  }
  handleRemove = (file) => {
    console.log(file)
    const lastFiles: IIamge[] = []
    if (this.state.fileList) {
      this.state.fileList.forEach(image => {
        if (image.url !== file.url) {
          lastFiles.push(image)
        }
      })
    }
    this.setState({
      fileList: lastFiles
    }, () => {
      this.props.onChange!(this.state.fileList)
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    })
  }

  handleChange = (info) => {
    const status = info.file.status
    if (status === 'done') {
      const before = this.state.fileList!
      const temp = info.file.response.result[0]
      before.push({
        uid: temp,
        size: 1,
        url: `/${apiPrefix}/static/${temp}`,
        name: temp,
        type: 'image',
      })
      this.setState({
        fileList: before
      }, () => {
          this.props.onChange!(this.state.fileList)
      })
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传</div>
      </div>
    )
    return (
      <div className='clearfix'>
        <Upload
          name='images' multiple accept='.jpg,.jpeg,.png,.webp'
          action= {AdminAPI.File.upload()}
          listType='picture-card'
          fileList={fileList!}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          onChange={this.handleChange}
        >
          {fileList!.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}