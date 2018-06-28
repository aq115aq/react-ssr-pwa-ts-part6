// 用 Ducks 结构， 把相关的代码放在一个独立的 module 文件中
// 对外暴露 types、reducer、action creators

import {actions as asyncComponentWillMount} from './asyncComponentWillMount'
import { Dispatch } from 'redux';

/**
 * TypeScript 定义
 */
export namespace Types {
  export type LOGIN = 'user/LOGIN';
  export type LOGOUT = 'user/LOGOUT';
  export type GET_INFO = 'user/GET_INFO';
}

export interface action_LOGIN {
  type: typeof types.LOGIN;
}
export interface action_LOGOUT {
  type: typeof types.LOGOUT;
}
export interface action_GET_INFO {
  type: typeof types.GET_INFO,
  info: string;
}

export type StoreState = Readonly<typeof initialState>;

export type actions = typeof actions

/**
 * redux Modules
 */

// Actions
export const types: {LOGIN: Types.LOGIN, LOGOUT: Types.LOGOUT, GET_INFO: Types.GET_INFO} = {
  LOGIN: 'user/LOGIN',
  LOGOUT: 'user/LOGOUT',
  GET_INFO: 'user/GET_INFO'
}

const initialState = {
  isLogined: false,
  info: ''
}

// Reducer
export default function reducer(state:StoreState = initialState, action:action_LOGIN | action_LOGOUT | action_GET_INFO) {
  switch (action.type) {
    case types.LOGIN: 
      return {
        ...state,
        isLogined: true
      }
    case types.LOGOUT:
      return {
        ...state,
        isLogined: false
      }
    case types.GET_INFO:
      return {
        ...state,
        info: action.info
      }
    default: return state;
  }
}

// Action Creators
export const actions = {
  login: () => {
    return {type: types.LOGIN}
  },
  logout: () => {
    return {type: types.LOGOUT}
  },
  getInfo: () => {
    return async (dispatch:Dispatch<any>) => {
      dispatch(asyncComponentWillMount.addAsync())
      await new Promise(resolve => {
        setTimeout(() => {
          dispatch({type: types.GET_INFO, info: '你已成功获取异步信息'})
          dispatch(asyncComponentWillMount.decreaseAsync())
          resolve()
        }, 20)
      });
    }
  }
}