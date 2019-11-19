// core
import React, { useState, useRef } from 'react';
// material-ui
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';

// api
import Api from '../../api/Api';

import { connect } from 'react-redux'
import { 
    deleteTodo,
    updateTodo, 
} from '../../engine/actions'


function TodoItem(props) {

    const [editable, setEditable] = useState(false);
    const inputEl = useRef(null);

    const handleIsDone = async () => {
        setEditable(false);
        const { item, handleUpdate } = props;
        const itemCopy = {...item};
        itemCopy.isDone = !item.isDone;
        updateItem(itemCopy);
    };

    const handleDeleteItem = async () => {
        const { item, handleDelete } = props;
        deleteItem(item.id);
    };

    const handleEditItem = () => {
        setEditable(true);
    };

    const handleSaveItem = () => {
        const { item, handleUpdate } = props;
        const itemCopy = {...item};
        itemCopy.summary = inputEl.current.value;
        updateItem(itemCopy);
        setEditable(false);
    };

    async function deleteItem(id) {
        const { dispatch } = props;
        try {
            await Api.deleteItemById(id);
            dispatch(deleteTodo(id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function updateItem(mutated) {
        const { dispatch } = props;
        try {
            const updated = await Api.updateItem(mutated);
            dispatch(updateTodo(updated));
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handleCancelEdit = () => {
        setEditable(false);
    }

    const { summary, isDone } = props.item;    
    const style = isDone ? {textDecoration: "line-through"} : {};

    let editableText;
    if(editable) {
        editableText = (
            <>
                <Checkbox 
                    checked={ isDone } 
                    onChange={ handleIsDone }
                /> 
                <TextField 
                    inputRef={ inputEl } 
                    defaultValue={ summary } 
                    margin="normal"
                /> 
            </>
        );
    } else {
        editableText = (
            <label style={style}>
                <Checkbox checked={ isDone } onChange={ handleIsDone }/> 
                { summary }
            </label> 
        );
    }
 
    return (
        <ListItem>
            <form>
                {editableText}
                <Buttons editable={ editable }
                    handleEdit={ handleEditItem } 
                    handleSave={ handleSaveItem } 
                    handleCancel ={ handleCancelEdit } 
                />
                <Button variant="outlined" color="primary" onClick={ handleDeleteItem }>
                    Delete
                </Button>
            </form>
        </ListItem>
    ); 
}

function Buttons(props) {
    const { editable, handleEdit, handleSave, handleCancel } = props;
    if(editable) {
        return (
            <>
                <Button variant="outlined" color="primary" onClick={ handleSave }>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={ handleCancel }>
                    Cancel
                </Button>    
            </>
        )
    } else  {
        return (
            <Button variant="outlined" color="primary" onClick={ handleEdit }>
                Edit
            </Button>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
      todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoItem);
