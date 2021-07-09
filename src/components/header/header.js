import React, {Component} from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './header.scss';

export default class Header extends Component {

    render() {
        return (
            <>
                <Container fluid="md">
                    <div className='wrap_header'>
                        <Link to='/' className='logo'>Game of Thrones DB</Link>
                        <ul className='list_menu'>
                            <Link to='/characters' className='list_menu__item'>Characters</Link>
                            <Link to='/houses' className='list_menu__item'>Houses</Link>
                            <Link to='/books' className='list_menu__item'>Books</Link>
                        </ul>
                    </div>
                </Container>
            </>
        )
    }
}