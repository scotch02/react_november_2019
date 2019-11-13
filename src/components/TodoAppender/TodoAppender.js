// core
import React, {useRef} from 'react';
// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function TodoAppender(props) {
    const inputEl = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newItemDefinition = {
            isDone: false,
            summary: inputEl.current.value
        };

        inputEl.current.value = "";
        props.handleNewItem(newItemDefinition);
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