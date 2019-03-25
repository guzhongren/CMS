import * as React from 'react'
import './index.less'
import {NavLink} from 'react-router-dom'
import { FaSignOutAlt, FaHome } from 'react-icons/fa'
interface IState {
}
export interface IProps {

}
export default class AdminHeader extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  render() {
    return (
      <div className={'adminHeader'}>
        <NavLink to={'/'} className={'tool'}>
          主页<FaHome className={'funcs'} />
        </NavLink>
        <span className='tool'>
          退出<FaSignOutAlt className={'funcs'} />
        </span>
      </div >
    )
  }
}