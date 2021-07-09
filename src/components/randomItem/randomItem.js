import React, { Component } from 'react';

import './randomItem.scss'

import ViewItems from '../viewItems';
import ErrorMessages from '../messages/errorMessages';
import Spinner from '../spinner';

export default class RandomItem extends Component {
    
    state = {
        id: null,
        load: true,
        data: null,
        error: false
    }

    loadingData = (getData, id) => {
        getData(id)
        .then(data => this.setState({
            data,
            load: false,
            error: false
        }))
        .catch(this.onError)
    }

    componentDidMount() {
        const {getData, randIdItems, startId} = this.props;
        this.setState({
                id: startId
        })
        this.loadingData(getData, startId);
        this.intervalId = setInterval(() => randIdItems(), 13000);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.randId !== this.props.randId) {
            const {getData, randId} = this.props;
            this.setState({
                id: randId
        })
            this.loadingData(getData, randId);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    

    onError = (err) => {
        this.setState({
            error: true,
            load: false
        })
    }

    render() {
        const {data, load, error} = this.state;
        const loading = load ? <Spinner/> : null;
        const content = data ? <ViewItems 
                                    data={data}
                                    title={<h4 className='title'>Random {data.Category}: {data.Name}</h4>}/> : null;
        const errorMes = error && !data ? <ErrorMessages/> : null;
        return (
            <>
                {loading}
                {content}
                {errorMes}
            </>
        )
    }
}

