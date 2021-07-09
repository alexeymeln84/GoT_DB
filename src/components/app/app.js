import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.scss';

import Header from '../header';
import MainPage from '../mainPage';
import Page from '../page';
import GotService from '../../service/gotService';


export default class App extends Component {

    state = {
        startCharId: 115,
        startHouseId: 25,
        startBookId: 2,
        id: null,
    }

    gotService = new GotService();

    randIdItems = (id) => {
        this.setState({id}) 
    }
   

    render() {
        const {id, startCharId, startBookId, startHouseId} = this.state;
        
        return (
            <Router>
                <div className='app'>
                    <Header/>
                        <Route path='/' exact > <MainPage/> </Route>
                        <Route path='/characters'>
                            <Page
                                getData={this.gotService.getCharacter}
                                getDataList={this.gotService.getAllCharacters}
                                randIdItems={() => this.randIdItems(Math.floor(Math.random() * 810 + 45))}
                                startId={startCharId}
                                randId={id}
                            />
                        </Route>
                        <Route path='/houses'>
                            <Page
                                getData={this.gotService.getHouse}
                                getDataList={this.gotService.getAllHouses}
                                randIdItems={() => this.randIdItems(Math.floor(Math.random() * 400 + 25))}
                                startId={startHouseId}
                                randId={id}
                            />
                        </Route>
                        <Route path='/books'>
                            <Page
                                getData={this.gotService.getBook}
                                getDataList={this.gotService.getAllBooks}
                                randIdItems={() => this.randIdItems(Math.floor(Math.random() * 11 + 1))}
                                startId={startBookId}
                                randId={id}
                            />
                        </Route>
                </div>
            </Router>
        )
    }
}