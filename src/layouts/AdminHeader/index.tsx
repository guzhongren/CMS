import * as React from 'react'
import './index.less'
import { NavLink, Redirect} from 'react-router-dom'
import LoginUtils from '@utils/Login'
import { FaSignOutAlt, FaHome } from 'react-icons/fa'
interface IState {
  isLogin?: boolean // 是否在登录状态

}
export interface IProps {

}
export default class AdminHeader extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLogin: true
    }
  }
  componentDidMount() {
    const loginStatus = LoginUtils.GetLoginState()
    if (loginStatus) {
      this.setState({
        isLogin: true
      })
    } else {
      this.setState({
        isLogin: false
      })
    }
  }

  logOut = () => {
    LoginUtils.DeleteLoginState().then(() => {
      this.setState({
        isLogin: false
      })
    })
  }
  render() {
    if (this.state.isLogin) {
      return (
        <div className={'adminHeader'}>
          <NavLink to={'/'} className={'tool'}>
            主页<FaHome className={'funcs'} />
          </NavLink>
          <span className='tool' onClick={this.logOut}>
            退出<FaSignOutAlt className={'funcs'} />
          </span>
        </div >
      )
    } else {
      return <Redirect to='/login'/>
    }
    
  }
}