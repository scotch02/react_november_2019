import React from 'react';

export default function TodoItem(props) {

    const handleChange = async () => {
        const { item, handleUpdate } = props;
        const itemCopy = {...item};
        itemCopy.isDone = !item.isDone;
        handleUpdate(itemCopy);
    };

    const handleDeleteItem = async () => {
        const { item, handleDelete } = props;
        handleDelete(item.id);
    };

    const handleEditItem = () => {

    };

    const handleSaveItem = () => {

    };

    const { summary, isDone } = props.item;    
    const style = isDone ? {textDecoration: "line-through"} : {};

    return (
        <li>
            <form style={style}>
                <input type='checkbox' checked={ isDone } onChange={ handleChange }/>
                <EditableText text={ summary } />
                <EditOrSaveButton handleEdit={ handleEditItem } handleSave={handleSaveItem} mode='save'/>
                <input type='button' value='delete' onClick={ handleDeleteItem } />
            </form>
        </li>
    ); 
}

function EditableText(props) {
    const { text, editable} = props;
    if(editable) {
        return (
            <input type="text" value={text} />    
        )
    } else {
        return (
            <>{text}</>    
        )
    }
}

function EditOrSaveButton(props) {
    const {mode = 'edit', handleEdit, handleSave } = props;
    if(mode === 'edit') {
        return (
            <input type='button' value='edit' onClick={ handleEdit } />
        )
    }
    if(mode === 'save') {
        return (
            <input type='button' value='save' onClick={ handleSave } />
        )
    }    
}