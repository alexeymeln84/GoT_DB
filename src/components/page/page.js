import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';


import './page.scss';

import RandomItem from '../randomItem';
import DescriptItem from '../descriptItem';
import ListItem from '../listItem';
import GotService from '../../service/gotService';

export default class Page extends Component {

    state = {
        flag: false,
        id: null
    }

    getService = new GotService();

    onToggleRandomItem = () => {
        this.setState((state) => {
            return {
                flag: !state.flag
            }
        })
    }

    getDescrItem = (id) => {
        this.setState({id})
    }

    render() {
        const {getData, getDataList, randIdItems, randId, startId} = this.props;
        const {flag, id} = this.state;
        const content = !flag ? <RandomItem
                                getData={getData}
                                randIdItems={randIdItems}
                                randId={randId}
                                startId={startId}
                                /> : null;
        return (
            <Container fluid='md'>
                <Row>
                    <Col sm={{size:5, offset: 0}}>
                        {content}
                    </Col>
                    <Col sm={{size: 5, offset: 2}}>
                        <DescriptItem
                        getData={getData}
                        idItem={id}
                        />
                    </Col>
                    <Col sm={{size: 10, offset: 2}}>
                        <Button
                            className="btn btn-outline-info"
                            style={{margin: '10px'}}
                            onClick={this.onToggleRandomItem}>Toggle Random Item</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{size: 5, offset: 0}}>
                        <ListItem
                        getDataList={getDataList}
                        getDescrItem ={this.getDescrItem}/>
                    </Col>
                </Row>
            </Container>
        )
    }

}