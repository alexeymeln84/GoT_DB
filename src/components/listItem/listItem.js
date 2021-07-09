import React, { Component } from 'react'

import './listItem.scss';

import Spinner from '../spinner';

export default class ListItem extends Component {

    state = {
        data: null,
        load: true
    }

    loadingData = (data) => {
        data()
        .then((data) =>  
            this.setState({
                data,
                load: false
            })
        )
    }

    componentDidMount() {
        const {getDataList} = this.props;
        this.loadingData(getDataList)
    }

    getListItems = (data) => {
        return data.map((item) => {
            return (
                <li key={item.id} className='pageList_item'
                onClick={() => this.props.getDescrItem(item.id)}>
                    <span className='label'>{item.Name}</span>
                </li>
            )

            
        })
    }

    render() {

        const {data} = this.state;
        if(!data) {
            return (
                <ViewList content={<Spinner/>}/>
            )
        }
        const dataList = this.getListItems(data);
        return (
            <ViewList content={dataList}/>
        )
    }
}

const ViewList = ({content}) => {
    return (
        
        <ul className='pageList'>
            {content}
        </ul>
    )
}