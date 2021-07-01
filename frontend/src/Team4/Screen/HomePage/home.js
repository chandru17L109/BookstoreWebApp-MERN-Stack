import React, { Component } from 'react'
import '../../Styles/App.css';
import Carousalslide from './Components/carousal';
import HomeContentCards from './Components/homeContentCards';
import Booklist from './Components/booklist';
import Author from './Components/AuthorDetails/design';
import Frequentques from './Components/frequentques';

export default class Home extends Component {
    render() {
        return (
            <>
                <Carousalslide/>
                <Booklist props={this.props}/>
                <HomeContentCards/>
                <Author/>
                <Frequentques/>
            </>
        )
    }
}