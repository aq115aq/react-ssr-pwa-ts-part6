import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

export interface Props {
  login: () => any;
}

class Login extends React.PureComponent<Props, object> {
  render () {
    return (
      <div>
        <button className='btn' onClick={this.props.login}>登陆</button>
        <NavLink className='link' to="/">
          <button className='btn'>返回主页</button>
        </NavLink>
      </div>
    )
  }
}
export default Login