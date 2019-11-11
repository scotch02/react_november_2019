import React, {useRef} from 'react';
import Api from '../../api/Api';

export default function TodoAppender(props) {
    const inputEl = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newItem = await Api.addNewItem({
            isDone: false,
            summary: inputEl.current.value
        });
        inputEl.current.value = "";
        props.handleNewItem(newItem);
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input ref={inputEl} type = "text" />
            <input type = "submit" value = "submit" />
        </form>
    )
}