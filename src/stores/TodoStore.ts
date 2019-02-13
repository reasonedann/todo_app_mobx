import {observable, action, computed} from 'mobx';

export class Todo {
    @observable value: string;
    @observable complete: boolean;

    constructor(value: string) {
        this.value = value;
        this.complete = false;
    }
};

export class TodoStore {
    @observable todos: Array<Todo> = [];
    @observable filter: string = '';
    @observable error: string = '';
    @observable info: string = '';


    @action addTodo = (value: string) => {
        this.todos.push(new Todo(value))
    };
    @action setError = (value: string) => {
        this.error = value;
    };
    @action removeTodoItem = (idxToRemove: number) => {
        this.todos = this.todos.filter((_, idx) => idx !== idxToRemove);
    };
    @action clearTodosList = () => {
        this.todos = [];
    };
    @action clearComplete = () => {
        this.todos = this.todos.filter(todo => !todo.complete);
    };
    @action setFilter = (value: string) => {
        this.filter = value;
    };

    @computed get todosCount() {
        if (this.todos.length > 1) {
            return `You have ${this.todos.length} things to do.`
        };
        if (this.todos.length === 1) {
            return 'You have only one thing to do!'
        };
        return 'You have no things to do :)'
    };
    @computed get filteredTodos() {
        if (this.filter) {
            const matchesFilter = new RegExp(this.filter, "i");
            return this.todos.filter(todo => matchesFilter.test(todo.value));
        }
        return this.todos;
    }
};

const store = new TodoStore();

export default store;