import React, { useState, useRef } from 'react';

export default function TodoItem(props) {

    const [editable, setEditable] = useState(false);
    const inputEl = useRef(null);

    const handleIsDone = async () => {
        setEditable(false);
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
        setEditable(true);
    };

    const handleSaveItem = () => {
        const { item, handleUpdate } = props;
        const itemCopy = {...item};
        itemCopy.summary = inputEl.current.value;
        handleUpdate(itemCopy);
        setEditable(false);
    };

    const handleCancelEdit = () => {
        setEditable(false);
    }

    const { summary, isDone } = props.item;    
    const style = isDone ? {textDecoration: "line-through"} : {};

    let editableText;
    if(editable) {
        editableText = (
            <>
                <input type='checkbox' checked={ isDone } onChange={ handleIsDone }/> 
                <input ref={ inputEl } type="text" defaultValue={ summary } /> 
            </>
        );
    } else {
        editableText = (
            <label>
                <input type='checkbox' checked={ isDone } onChange={ handleIsDone }/> 
                { summary }
            </label> 
        );
    }
 
    return (
        <li>
            <form style={style}>
                {editableText}
                <Buttons editable={ editable }
                    handleEdit={ handleEditItem } 
                    handleSave={ handleSaveItem } 
                    handleCancel ={ handleCancelEdit } 
                />
                <input type='button' value='delete' onClick={ handleDeleteItem } />
            </form>
        </li>
    ); 
}

function Buttons(props) {
    const { editable, handleEdit, handleSave, handleCancel } = props;
    if(editable) {
        return (
            <>
                <input type='button' value='save' onClick={ handleSave } />
                <input type='button' value='cancel' onClick={ handleCancel } />
            </>
        )
    } else  {
        return (
            <input type='button' value='edit' onClick={ handleEdit } />
        )
    }
}