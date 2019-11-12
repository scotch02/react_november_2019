// core
import React, {Component} from 'react';
// api
import Api from '../../api/Api';
// components
import TodoItem from '../TodoItem/TodoItem';
import TodoAppender from '../TodoAppender/TodoAppender';

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

    async addNewItem(newItemDefinition) {
        try {
            const newItem = await Api.addNewItem(newItemDefinition);
            this.setState(state => ({
                items: [...state.items, newItem]
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async deleteItem(id) {
        try {
            await Api.deleteItemById(id);

            this.setState(state => {
                const { items } = state;
                const newItems = items.filter(item => item.id !== id);

                return {
                    items: newItems
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateItem(mutated) {
        try {
            const updated = await Api.updateItem(mutated);

            this.setState(state => {
                const { items } = state;
                const idx = items.findIndex(item => item.id === updated.id);

                if(idx !== -1) {

                    const newItems = [...items];
                    newItems[idx] = updated;

                    return {
                        items: newItems
                    }
                } else {
                    return state;
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async componentDidMount() {
        try {
            const items = await Api.getAllItems();

            this.setState({
                items
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    render() {
        const { items } = this.state;
        return (
            <>
                <TodoAppender handleNewItem={this.addNewItem} />
                <ul>
                    { items.map(item => <TodoItem key={item.id} item={item} handleUpdate={this.updateItem} handleDelete={this.deleteItem}/>) }
                </ul>
            </>
        )
    }
}

export default TodoList