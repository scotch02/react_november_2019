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
    }

    addNewItem(newItem) {
        this.setState(state => ({
            items: [...state.items, newItem]
        }));
    }

    updateItem(updated) {
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
    }

    async componentDidMount() {
        let items = await Api.getAllItems();

        this.setState({
            items
        });
    }

    render() {
        const { items } = this.state;
        return (
            <>
                <TodoAppender handleNewItem = {this.addNewItem}/>
                <ul>
                    { items.map(item => (
                        <TodoItem 
                            key={item.id} 
                            summary={item.summary} 
                            id={item.id}
                            isDone={item.isDone} 
                            handleUpdateItem={this.updateItem}
                        />
                        )) }
                </ul>
            </>
        )
    }
}

export default TodoList