import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

export interface Props {
  info: string;
  isLogined: boolean;
  getInfo: () => any;
  logout: () => any;
}

class Home extends React.PureComponent<Props, object> {
  componentWillMount () {
    this.props.getInfo()
  }

  render () {
    const unLogin = (
      <div>
        <h1>未登录</h1>
        <NavLink className='link' to="/login">
          <button className='btn'>去登陆</button>
        </NavLink>
        <p className='info'>{this.props.info}</p>
      </div>
    )

    const isLogined = (
      <div>
        <h1>已登录</h1>
        <button className='btn' onClick={this.props.logout}>退出登录</button>
        <p className='info'>{this.props.info}</p>
      </div>
    )

    if (this.props.isLogined) {
      return isLogined
    } else {
      return unLogin
    }
  }
}
export default Home