// core
import React, {Component} from 'react';
// api
import Api from '../../api/Api';
// components
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
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
            <ul>
                { items.map(item => <TodoItem key={item.id} summary = {item.summary} />) }
            </ul>
        )
    }
}

export default TodoList