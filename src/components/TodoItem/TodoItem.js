import React from 'react';

export default function TodoItem(props) {
    const { summary } = props;
    return (
        <li>
            <form>
                <input type = 'checkbox' />
                {summary}
            </form>
        </li>
    ); 
}