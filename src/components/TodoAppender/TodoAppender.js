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

    const {addNewItem} = props;

    const handleSubmit = (event) => {
        event.preventDefault();

        const newItemDefinition = {
            isDone: false,
            summary: inputEl.current.value
        };

        inputEl.current.value = "";
        addNewItem(newItemDefinition);
    };

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

const mapDispatchToProps = (dispatch) => {
    return {
        addNewItem: async (newItemDefinition) => {
            try {
                const newItem = await Api.addNewItem(newItemDefinition);
                dispatch(addTodo(newItem));
            } catch (error) {
                console.error('Error:', error);
            }    
        }    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppender);
