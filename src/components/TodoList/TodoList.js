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

    const { filter, getItems, todos: items } = props;

    useEffect(() => {
        getItems(filter);
    }, [filter, getItems]);
    
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

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: async (filter) => {
            try {
                const items = await Api.getItems(filter);
                dispatch(loadInitialTodoList(items));
            } catch (error) {
                console.error('Error:', error);
            }
        }    
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
