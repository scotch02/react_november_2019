import React, {useRef} from 'react';

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
            <input ref={inputEl} type = "text" />
            <input type = "submit" value = "add todo" />
        </form>
    )
}