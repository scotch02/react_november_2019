// core
import React, {Component} from 'react';
// api
import Api from '../../api/Api';
// components
import TodoItem from '../TodoItem/TodoItem';
import TodoAppender from '../TodoAppender/TodoAppender';
// material-ui
import List from '@material-ui/core/List';

import { connect } from 'react-redux'
import { 
    addTodo,
    deleteTodo,
    updateTodo, 
    loadInitialTodoList
} from '../../engine/actions'


class TodoList extends Component {

    constructor(props) {
        super(props);

        this.addNewItem = this.addNewItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        const { filter } = this.props;
        this.getItems(filter);
    }

    async addNewItem(newItemDefinition) {
        const { dispatch } = this.props; 
        try {
            const newItem = await Api.addNewItem(newItemDefinition);
            dispatch(addTodo(newItem));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async deleteItem(id) {
        const { dispatch } = this.props;
        try {
            await Api.deleteItemById(id);
            dispatch(deleteTodo(id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateItem(mutated) {
        const { dispatch } = this.props;
        try {
            const updated = await Api.updateItem(mutated);
            dispatch(updateTodo(updated));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async getItems(filter) {
        const { dispatch } = this.props;
        try {
            const items = await Api.getItems(filter);
            dispatch(loadInitialTodoList(items));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    render() {
        const { todos: items } = this.props;

        return (
            <>
                <TodoAppender handleNewItem={this.addNewItem} />
                <List>
                    { items.map(item => <TodoItem key={item.id} item={item} handleUpdate={this.updateItem} handleDelete={this.deleteItem}/>) }
                </List>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoList);
