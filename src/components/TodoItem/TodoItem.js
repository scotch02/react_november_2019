import React, {Component} from 'react';
import Api from '../../api/Api';

export default class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.isDone
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event) {
        const checked = event.target.checked;
        this.setState({checked: checked});

        const { summary, id, handleUpdateItem } = this.props;

        const updated = await Api.updateItem({
            isDone: checked,
            summary: summary,
            id: id
        });

        handleUpdateItem(updated);
    }

    render() {
        const { summary } = this.props;    
        const { checked } = this.state;
        const style = checked ? {textDecoration: "line-through"} : {};

        return (
            
            <li>
                <form style={style}>
                    <input type='checkbox' checked={this.state.checked} onChange={this.handleChange}/>
                    {summary}
                </form>
            </li>
        );

    }
 
}