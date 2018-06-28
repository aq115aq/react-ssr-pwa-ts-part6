// 用 Ducks 结构， 把相关的代码放在一个独立的 module 文件中
// 对外暴露 types、reducer、action creators

/**
 * TypeScript 定义
 */
export namespace Types {
  export type ADDASYNC = 'asyncComponentWillMount/ADDASYNC';
  export type DECREASEASYNC = 'asyncComponentWillMount/DECREASEASYNC';
}

export interface action_ADDASYNC {
  type: typeof types.ADDASYNC;
}
export interface action_DECREASEASYNC {
  type: typeof types.DECREASEASYNC;
}

export type StoreState = Readonly<typeof initialState>;

export type actions = typeof actions

/**
 * redux Modules
 */

// Actions
export const types: {ADDASYNC: Types.ADDASYNC, DECREASEASYNC: Types.DECREASEASYNC} = {
  ADDASYNC: 'asyncComponentWillMount/ADDASYNC',
  DECREASEASYNC: 'asyncComponentWillMount/DECREASEASYNC'
}

const initialState = {
  asyncWait: 0
}
// Reducer
export default function reducer(state:StoreState = initialState, action:action_ADDASYNC|action_DECREASEASYNC) {
  switch (action.type) {
    case types.ADDASYNC: 
      return {
        ...state,
        asyncWait: state.asyncWait + 1
      }
    case types.DECREASEASYNC: 
      return {
        ...state,
        asyncWait: state.asyncWait - 1
      }
    default: return state;
  }
}

// Action Creators
export const actions = {
  addAsync: () => {
    return {type: types.ADDASYNC}
  },
  decreaseAsync: () => {
    return {type: types.DECREASEASYNC}
  }
}