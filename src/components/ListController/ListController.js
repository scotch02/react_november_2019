// core
import React, {Component} from 'react';
// api
import Api from '../../api/Api';

class ListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    async componentDidMount() {
        let items = await Api.getAllItems();

        this.setState({
            items
        });
    }

    render() {
        const { items } = this.state;
        return (
            <ul>{ items.map(item => <li key={item.id}>{item.summary}</li>) }</ul>
        )
    }
}

export default ListController