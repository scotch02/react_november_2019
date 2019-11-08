// core
import React, {Component} from 'react';

class ListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    async componentDidMount() {
        let response = await fetch('http://localhost:4000/todoListItems');
        let items = await response.json();

        this.setState({
            items
        });
    }

    render() {
        return (
            <ul>
                {this.state.items.map(item => 
                    <li key={item.id}>{item.summary}</li>    
                )}
            </ul>
        )
    }
}

export default ListController