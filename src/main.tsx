import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './stores/TodoList';
import store from './stores/TodoStore';


ReactDOM.render(<TodoList store={store}/>, document.getElementById('app'));