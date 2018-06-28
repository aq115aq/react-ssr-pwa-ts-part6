import * as React from 'react';
import * as ReactDOM from 'react-dom';

// router
import {BrowserRouter as Router} from 'react-router-dom';
import getRoutes from './routes';

// redux
import { Provider, Store } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import reducer, {rootState} from './redux';
import thunkMiddleware from 'redux-thunk'

interface myWindow extends Window {
  init_state?: any;
  [name: string]: any;
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore) // 使用redux-thunk中间件
let store:Store<rootState>
if ((window as myWindow).init_state) {
  store = createStoreWithMiddleware(reducer, (window as myWindow).init_state)
} else {
  store = createStoreWithMiddleware(reducer)
}

// hydrate 用于将服务器渲染的HTML和React混合
ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);