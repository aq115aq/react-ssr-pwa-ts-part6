import { combineReducers } from 'redux';
import user, {StoreState as user_StoreState} from './user'
import asyncComponentWillMount, {StoreState as asyncComponentWillMount_StoreState} from './asyncComponentWillMount'

export default combineReducers({
  user,
  asyncComponentWillMount
})

export type rootState = {
  user: user_StoreState,
  asyncComponentWillMount: asyncComponentWillMount_StoreState
}