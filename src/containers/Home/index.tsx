import Home from './Home'
import reducers, {actions} from '../../redux/user'
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {rootState} from '../../redux'

function mapStateToProps(state: rootState) {
  return {
    isLogined: state.user.isLogined,
    info: state.user.info
  };
}

function mapDispatchToProps(dispatch:Dispatch) {
  return bindActionCreators({
    logout: actions.logout,
    getInfo: actions.getInfo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
export const reducer = reducers
export const action = actions