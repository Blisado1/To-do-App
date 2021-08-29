import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

/*
    TodoMVC
    1. add todo
    2. display todo
    3. cross of todo
    4. show number of active todos
    5. filter all/active/complete
    6. delete todo
    7. delete all complete
        7.1. Only show if at least one is complete
    8. button to toggle all on/off.
*/

export default class TodoList extends React.Component {
    state = {
        todos: [],
        todoToShow: "all",
        toggleAllComplete: true
    };

    addTodo = (todo) => {
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
    }

    toggleComplete = (id) => {
        this.setState(state =>({
            todos: state.todos.map(todo => {
                if(todo.id === id){
                    //Update
                    return {
                        ...todo,
                        complete: !todo.complete
                    }                    
                } else {
                    return todo;
                }
            })
        }))
    }
    updateTodoToShow = (s) => {
        this.setState({
            todoToShow: s
        });
    }

    handleDelete = (id) => {
        this.setState(state => ({
            todos: this.state.todos.filter(todo => todo.id !== id)
        }))
    }

    removeAllTodoThatAreComplete = (id) => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }))
    }

    render() {
        let todos = [];

        if (this.state.todoToShow === 'all'){
            todos = this.state.todos;
        }else if (this.state.todoToShow === 'active'){
            todos = this.state.todos.filter(todo => !todo.complete)
        }else if (this.state.todoToShow === 'complete'){
            todos = this.state.todos.filter(todo => todo.complete)
        }

        return (
            <div> 
            <TodoForm onSubmit={this.addTodo} />
            {todos.map(todo => (
                <Todo 
                    key={todo.id} 
                    toggleComplete={() => this.toggleComplete(todo.id)} 
                    onDelete={() => this.handleDelete(todo.id)}
                    todo={todo} 
                />
            ))}
            <div>
                Todos left: {this.state.todos.filter(todo => !todo.complete).length}
            </div>
            <div>
                <button onClick={() => this.updateTodoToShow('all')}>all</button>
                <button onClick={() => this.updateTodoToShow('active')}>active</button>
                <button onClick={() => this.updateTodoToShow('complete')}>complete</button>
            </div>
            
            {this.state.todos.some(todo => todo.complete) ? (
                <div>
                    <button onClick={this.removeAllTodoThatAreComplete}> remove all complete todos</button>
                </div>
            ) : null}

            <div>
                <button onClick={() =>
                    this.setState(state => ({
                        todos: state.todos.map(todo => ({
                            ...todo,
                            complete: state.toggleAllComplete
                        })),
                        toggleAllComplete: !state.toggleAllComplete
                    }))
                }>
                    toggle all complete {`${this.state.toggleAllComplete}`}
                </button>
            </div>
        </div>
        );
    }
}