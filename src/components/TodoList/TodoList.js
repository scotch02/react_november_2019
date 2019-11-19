// core
import React, { useEffect } from 'react';
// api
import Api from '../../api/Api';
// components
import TodoItem from '../TodoItem/TodoItem';
import TodoAppender from '../TodoAppender/TodoAppender';
// material-ui
import List from '@material-ui/core/List';

import { connect } from 'react-redux'
import { 
    loadInitialTodoList
} from '../../engine/actions'


function TodoList(props) {

    const { filter, dispatch } = props;

    useEffect(() => {
        async function getItems(filter) {
            try {
                const items = await Api.getItems(filter);
                dispatch(loadInitialTodoList(items));
            } catch (error) {
                console.error('Error:', error);
            }
        }

        getItems(filter);
    }, [filter, dispatch]);
    

    const { todos: items } = props;

    return (
        <>
            <TodoAppender />
            <List>
                { items.map(item => <TodoItem key={item.id} item={item} />) }
            </List>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoList);
