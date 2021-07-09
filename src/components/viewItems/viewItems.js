import React, { Component } from 'react';

export default class ViewItems extends Component {

    keyItem = 1
    updateKeyItem = () => {
        this.keyItem++
    }
    render() {
        const {data, title} = this.props;
        let itemList = Object.entries(data).filter(key => key[0] !== 'id' && key[0] !== 'Name' && key[0] !== 'Category')
                                       .map((val) => {
        this.updateKeyItem(this.keyItem)
        return <li key={this.keyItem} className='itemsList_item'>
                    <span className='label'>{val[0]}</span>
                    <span className='text'>{val[1]}</span>
                </li>
    })

        return (
            <>
                {title}
                <ul className='itemsList'>
                    {itemList}
                </ul>
            </>
        )
    }
    
}
