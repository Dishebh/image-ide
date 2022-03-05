import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import logger from 'redux-logger';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CodeEditor from './components/CodeEditor/CodeEditor';

const store = createStore(reducers, {}, applyMiddleware(...[thunk, logger]));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path='/'>
        <App />
      </Route>
      <Route exact path='/editor'>
        <CodeEditor />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
