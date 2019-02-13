import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './stores/TodoList';
import TodoListContext from './stores/TodoStore';


ReactDOM.render(
    <TodoListContext.Consumer>
        {(store) => <TodoList store={store}/>}
    </TodoListContext.Consumer>,
    document.getElementById('app')
);