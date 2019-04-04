import React from 'react'
import { Table, Divider} from 'antd'
import { NavLink } from 'react-router-dom'
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
      }, {
        title: '操作',
        key: 'id',
        render: (userInfo) => (
          <span>
            <NavLink to={`/admin/users/${userInfo.id}`}>查看</NavLink>
            <Divider type='vertical' />
            <a href='javascript:;'>删除</a>
          </span>
        ),
      }]
    return(
      <Table bordered pagination={{ pageSize: 10 }} className={'userListTable'} dataSource={this.state.dataSource} columns={columns} />
    )
  }
}