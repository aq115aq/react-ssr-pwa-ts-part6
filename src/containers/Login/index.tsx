import Login from './Login'
import reducers, {actions} from '../../redux/user'
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rootState } from '../../redux'

function mapStateToProps(state:rootState) {
  return {};
}

function mapDispatchToProps(dispatch:Dispatch) {
  return bindActionCreators({
    login: actions.login
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
export const reducer = reducers
export const action = actions