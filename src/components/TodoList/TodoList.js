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
    updateTodo 
} from '../../engine/actions'


class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.addNewItem = this.addNewItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
/*
    componentDidMount() {
        const { filter } = this.props;
        this.getItems(filter);
    }
*/
    async addNewItem(newItemDefinition) {
        const { dispatch } = this.props; 
        try {
            const newItem = await Api.addNewItem(newItemDefinition);
            dispatch(addTodo(newItem));
//            this.setState(state => ({
//                items: [...state.items, newItem]
//            }));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async deleteItem(id) {
        const { dispatch } = this.props;
        try {
            await Api.deleteItemById(id);
            dispatch(deleteTodo(id));

//            this.setState(state => {
//                const { items } = state;
//                const newItems = items.filter(item => item.id !== id);
//
//                return {
//                    items: newItems
//                }
//            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateItem(mutated) {
        const { dispatch } = this.props;
        try {
            const updated = await Api.updateItem(mutated);
            dispatch(updateTodo(updated));

//            this.setState(state => {
//                const { items } = state;
//                const idx = items.findIndex(item => item.id === updated.id);
//
//                if(idx !== -1) {
//
//                    const newItems = [...items];
//                    newItems[idx] = updated;
//
//                    return {
//                        items: newItems
//                    }
//                } else {
//                    return state;
//                }
//            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
/*
    async getItems(filter) {
        const { dispatch } = this.props;
        try {
            const items = await Api.getItems(filter);
            items.forEach(item => dispatch(addTodo(item)))

//            this.setState({
//                items
//            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
*/
    render() {
        const { items } = this.props.todos;
        if(items) {
        return (
            <>
                <TodoAppender handleNewItem={this.addNewItem} />
                <List>
                    { items.map(item => <TodoItem key={item.id} item={item} handleUpdate={this.updateItem} handleDelete={this.deleteItem}/>) }
                </List>
            </>
        )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
      todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoList);
