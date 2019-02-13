import React from 'react';
import { observer } from 'mobx-react';
import { TodoStore, Todo } from './TodoStore';

import styled from '@emotion/styled';

interface ITodoListProps {
    store: TodoStore;
}

@observer
export default class TodoList extends React.Component<ITodoListProps> {

    handleOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const todoInput = target.elements.namedItem('todoInput') as HTMLInputElement;
        const todoInputValue = todoInput.value.trim();
        const todoInputUpper = todoInputValue.charAt(0).toUpperCase() + todoInputValue.slice(1);

        if (!todoInputUpper) {
            this.props.store.setError('You cannot add an empty line!')
        } else {
            this.props.store.addTodo(todoInputUpper);
            todoInput.value = '';
            this.props.store.error = '';
        }
    }

    handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.store.setFilter(e.target.value.trim());
    }
    toggleComplete = (todo: Todo) => {
        todo.complete = !todo.complete;
    }

    render() {
        const { filter, filteredTodos, todosCount, removeTodoItem, clearComplete, clearTodosList, error } = this.props.store;
        const todoList = filteredTodos.map((todo, idx) => (
            <ListItem key={idx}>
                <div>{idx+1}. {todo.value}</div>
                <input type='checkbox' onChange={() => this.toggleComplete(todo)} checked={todo.complete}/>
                <Button onClick={() => removeTodoItem(idx)}>Delete</Button>
            </ListItem>
        ));

        return (
            <Container>
                <h1>To Do List:</h1>
                {error && <p>{error}</p>}
                    <AddTodo onSubmit={this.handleOnSubmit}>
                        <input type="text" placeholder="Enter to do thing" name="todoInput"/>
                        <Button>Add to do</Button>
                    </AddTodo>
                <List>{todoList}</List>
                <h3>{todosCount}</h3>
                <Buttons>
                    <Button onClick={clearComplete}>Clear complete</Button>
                    <Search>
                        <input type="text" name="filterInput" placeholder="Search..." value={filter} onChange={this.handleFilter}/>
                        <Button type="submit"><i className="fa fa-search"></i></Button>
                    </Search>
                    <Button onClick={clearTodosList}>Clear the list</Button>
                </Buttons>
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    min-width: 460px;
    max-width: 1000px;
    background: teal;
    text-align: center;

    h1 {
        color: whitesmoke;
        padding: 15px;
    }
    h3 {
        color: whitesmoke;
        padding: 15px;
    }
    p {
        background-color: tomato;
        padding: 15px;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 0 50px;
    padding: 15px;
`;

const Button = styled.button`
    background: lightgrey;
    padding: 10px 15px;
    border-radius: 8px;
    color: black;
    font-size: 15px;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;

    :hover {
        background: lightseagreen;
        color: white;
    }
`;

const AddTodo = styled.form`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
    font-size: 18px;
    border-top: solid 6px white;
    background: whitesmoke;

    input {
        padding: 10px 0;
        padding-left: 15px;
        border: 1px solid dimgrey;
        font-size: 18px;
        min-width: 600px;
    }
`;
const Search = styled.div`
    display: flex;
    flex-flow: row wrap;

    input {
        border: solid 1px black;
        padding: 5px 5px 5px 15px;
        font-size: 15px;
    }

    button {
        border-radius: 0;
    }
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    background: whitesmoke;
    font-size: 20px;
`;

const ListItem = styled.li`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 10px;

    div {
        display: flex;
        justify-content: start;
        min-width: 700px;
        padding: 10px;

    }

    input {
        border: 1px solid dimgrey;
    }
`;