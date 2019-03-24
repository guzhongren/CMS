import * as React from 'react'
import './index.less'
import { FaSignOut } from 'react-icons/lib/fa'
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
        <span className='tool'>
          退出<FaSignOut className={'logStatus'} />
        </span>
      </div >
    )
  }
}