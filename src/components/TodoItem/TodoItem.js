import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


// api
import Api from '../../api/Api';

import { connect } from 'react-redux'
import {
    deleteTodo,
    updateTodo,
} from '../../engine/actions'




const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function TodoItem(props) {
    const { item, handleUpdate, handleDelete } = props;

    const { summary, isDone } = item;

    const inputEl = useRef(null);

    const classes = useStyles();
    const [editable, setEditable] = useState(false);

    const handleIsDone = () => {
        setEditable(false);
        const itemCopy = { ...item };
        itemCopy.isDone = !item.isDone;
        handleUpdate(itemCopy);
    };

    const handleDeleteItem = () => {
        handleDelete(item.id);
    };

    const handleEditItem = () => {
        setEditable(true);
    };

    const handleSaveItem = () => {
        const itemCopy = { ...item };
        itemCopy.summary = inputEl.current.value;
        handleUpdate(itemCopy);
        setEditable(false);
    };

    const handleCancelEdit = () => {
        setEditable(false);
    }


    const style = isDone ? { textDecoration: "line-through" } : {};

    let editableText;

    if (editable) {
        editableText = (
            <TextField
                inputRef={inputEl}
                defaultValue={summary}
                margin="normal"
            />
        );
    } else {
        editableText = (
            <Typography variant="h5" component="h2">
                {summary}
            </Typography>
        );
    }


    return (
        <ListItem>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Summary
                    </Typography>
                    {editableText}
                </CardContent>
                <CardActions>
                    <label style={style}>
                        <Typography className={classes.pos} color="textSecondary">
                            completed
                        </Typography>
                        <Checkbox checked={isDone} onChange={handleIsDone} />
                    </label>
                </CardActions>
                <CardActions>
                    <Buttons editable={editable}
                        handleEdit={handleEditItem}
                        handleSave={handleSaveItem}
                        handleCancel={handleCancelEdit}
                        handleDelete={handleDeleteItem}
                    />
                </CardActions>
            </Card>
        </ListItem>
    );
}

function Buttons(props) {
    const { editable, handleEdit, handleSave, handleCancel, handleDelete } = props;
    if (editable) {
        return (
            <>
                <Button color="primary" size="small" onClick={handleSave}>
                    Save
                </Button>
                <Button color="secondary" size="small" onClick={handleCancel}>
                    Cancel
                </Button>
            </>
        )
    } else {
        return (
            <>
                <Button color="primary" size="small" onClick={handleEdit}>
                    Edit
                </Button>
                <Button color="primary" size="small" onClick={handleDelete}>
                    Delete
                </Button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUpdate: async (mutated) => {
            try {
                const updated = await Api.updateItem(mutated);
                dispatch(updateTodo(updated));
            } catch (error) {
                console.error('Error:', error);
            }
        },
        handleDelete: async (id) => {
            try {
                await Api.deleteItemById(id);
                dispatch(deleteTodo(id));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
