import React, { Component } from 'react';

import ViewItems from '../viewItems';
import SelectMessages from '../messages/selectMessages';

export default class DescriptItem extends Component {

    state = {
        data: null,
        id: null
    }

    loadingData = (data, id) => {
        data(id)
        .then(data => this.setState({
            id: id,
            data,
        }))
    }

    componentDidMount() {
        const {getData, idItem} = this.props;
        if (idItem) {
            this.loadingData(getData, idItem);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.idItem !== this.props.idItem) {
            const {getData, idItem} = this.props;
            this.loadingData(getData, idItem);
        }
    }
    render() {
        
        const {data, id} = this.state;
        const select = (!data && !id) ? <SelectMessages/> : null;
        const content = (data || id) ? <ViewItems 
                                       data={data} 
                                       title={<h4 className='title'>Name: {data.Name}</h4>}/> : null;
        return (
            <>
                {select}
                {content}
            </>
        )
    }
}
