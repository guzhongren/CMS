import React from 'react'
import {Table} from 'antd'
import './index.less'
interface IProps {
  list?: any[]
}

interface IState {
  dataSource?: any[]
}

export default class UserTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: this.props.list
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({
        dataSource: nextProps.list
      })
    }
  }

  render() {
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
    }]
    return(
      <Table className={'userListTable'} dataSource={this.state.dataSource} columns={columns} />
    )
  }
}