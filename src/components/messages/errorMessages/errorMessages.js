import React, { Component } from 'react';

export default class ErrorMessages extends Component {
    render() {
        return (
            <>
                <h4 className='title'>Sorry. Service is temporarily unavailable</h4>
                <div className='block_bg__error'/>
            </>
        )
    }
}