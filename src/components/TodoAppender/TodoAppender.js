// core
import React, {useRef} from 'react';
// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// api
import Api from '../../api/Api';

import { connect } from 'react-redux'
import { 
    addTodo,
} from '../../engine/actions'

function TodoAppender(props) {
    const inputEl = useRef(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        const newItemDefinition = {
            isDone: false,
            summary: inputEl.current.value
        };

        inputEl.current.value = "";
        addNewItem(newItemDefinition);
    };

    async function addNewItem(newItemDefinition) {
        const { dispatch } = props; 
        try {
            const newItem = await Api.addNewItem(newItemDefinition);
            dispatch(addTodo(newItem));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <TextField 
                inputRef={ inputEl } 
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
                Add todo
            </Button>    
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
      todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoAppender);
