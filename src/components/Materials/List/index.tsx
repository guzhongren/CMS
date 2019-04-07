import React from 'react'
import './index.less'
import Table from './Table'
import { Button, Breadcrumb } from 'antd'
import { Redirect } from 'react-router-dom'
import AdminAPI from '@api/Admin'
import { FaHome, FaBoxes } from 'react-icons/fa'
interface IState {
  materialsList?: any[],
  isAddMaterial?: boolean
}
export default class UserList extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      materialsList: [],
      isAddMaterial: false
    }
    this.getMaterialList()
  }

  handleAddUser = () => {
    this.setState({
      isAddMaterial: true
    })
  }

  getMaterialList = () => {
    AdminAPI.Material.getMaterialList().then((data: any) => {
      this.setState({
        materialsList: data
      })
    }, err => {
      console.error(err)
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isAddMaterial && <Redirect to='/admin/materials/add'/>}
        {!this.state.isAddMaterial && <div className={'materialsList'}>
          <div className='usersNavbar'>
            <Breadcrumb>
              <Breadcrumb.Item href='/#/admin'>
                <FaHome className='icon' />
              </Breadcrumb.Item>
              <Breadcrumb.Item href='/#/admin/materials'>
                <FaBoxes className='icon' />
                <span>物料</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Button type='primary' onClick={this.handleAddUser} ><FaBoxes className='icon' />新增物料</Button>
          </div>
          <div className='userTable'><Table list={this.state.materialsList} /></div>
        </div>
        }
      </React.Fragment>
    )
  }
}
