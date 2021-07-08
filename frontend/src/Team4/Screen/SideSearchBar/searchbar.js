import React, { Component } from 'react'
// import {Button,Card,Row,Container} from 'react-bootstrap' 
import '../../Styles/searchbar.css';
// import { FaStar } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from '../../action/action'
import {connect} from 'react-redux';
import arrow  from "../../images/Arrow.png"

class Searchbar extends Component {
    constructor(props){
        super(props);
            this.state = {popularbooks:[], index : 0, ratingsall:"sort=-ratings",

                          allbookcategory: '&', horror : "&category=horror", comedy : "&category=comedy", adeventure : "&category=adeventure", fiction : "&category=fiction",
                          ancient : "&category=ancient", sciencefiction : "&category=sciencefiction", thriller : "&category=thriller", spritual : "&category=spritual", classic : "&category=classic",

                          below_500 : "&price[lt]=500",AboveEqual_500:"&price[gte]=500",AboveEqual_1000:"&price[gte]=1000",
                        
                          dis50andAbove : "&discount[gte]=50", dis30andAbove : "&discount[gte]=30", dis10andAbove : "&discount[gte]=10",

                          rating5: "&ratings=5",rating4: "&ratings=4",rating3: "&ratings=3",rating2: "&ratings=2",rating1: "&ratings=1",

                          sortpriceLtoH : "&sort=price", sortpriceHtoL : "&sort=-price", sortdiscountLtoH : "&sort=discount", sortdiscounHtoL : "&sort=-discount",sortratingLtoH : "&sort=ratings",sortratingHtoL : "&sort=-ratings"   
                        }
    }
    allbook(querycondition){ this.props.onFetchallbook(querycondition);this.props.onSetPageNo(1);this.setState({index:1}) }
    horror(querycondition){ this.props.onFetchhorror(querycondition) ;this.props.onSetPageNo(1); this.setState({index:2})}
    comedy(querycondition){ this.props.onFetchcomedy(querycondition);this.props.onSetPageNo(1); this.setState({index:3})}
    adeventure(querycondition){ this.props.onFetchadeventure(querycondition);this.props.onSetPageNo(1); this.setState({index:4}) }
    fiction(querycondition){ this.props.onFetchfiction(querycondition);this.props.onSetPageNo(1); this.setState({index:5}) }
    ancient(querycondition){ this.props.onFetchancient(querycondition);this.props.onSetPageNo(1); this.setState({index:6}) }
    sciencefiction(querycondition){ this.props.onFetchsciencefiction(querycondition) ;this.props.onSetPageNo(1); this.setState({index:7})}
    thriller(querycondition){ this.props.onFetchthriller(querycondition);this.props.onSetPageNo(1); this.setState({index:8}) }
    spritual(querycondition){ this.props.onFetchspritual(querycondition);this.props.onSetPageNo(1); this.setState({index:9}) }
    classic(querycondition){ this.props.onFetchclassic(querycondition) ;this.props.onSetPageNo(1); this.setState({index:10})}

    below500(querycondition) {this.props.onFetchPricebelow500(querycondition);this.props.onSetPageNo(1); this.setState({index:11}) }
    aboveand500(querycondition) { this.props.onFetchPrice500andabove(querycondition);this.props.onSetPageNo(1); this.setState({index:12}) }
    aboveand1000(querycondition) { this.props.onFetchPrice1000andabove(querycondition);this.props.onSetPageNo(1); this.setState({index:13}) }

    discount50andabove(querycondition) { this.props.onFetchDiscount50andabove(querycondition);this.props.onSetPageNo(1); this.setState({index:14}) }
    discount30andabove(querycondition) { this.props.onFetchDiscount30andabove(querycondition);this.props.onSetPageNo(1); this.setState({index:15}) }
    discount10andabove(querycondition) { this.props.onFetchDiscount10andabove(querycondition);this.props.onSetPageNo(1); this.setState({index:16}) }

    // ratings5(querycondition){ this.props.onFetchRatings5(querycondition) }
    // ratings4(querycondition){ this.props.onFetchRatings4(querycondition) }
    // ratings3(querycondition){ this.props.onFetchRatings3(querycondition) }
    // ratings2(querycondition){ this.props.onFetchRatings2(querycondition) }
    // ratings1(querycondition){ this.props.onFetchRatings1(querycondition) }

    sortpricelowtohigh(querycondition){ this.props.onFetchSortpricelowtohigh(querycondition);this.props.onSetPageNo(1); this.setState({index:17}) }
    sortpricehightolow(querycondition){ this.props.onFetchSortpricehightolow(querycondition);this.props.onSetPageNo(1); this.setState({index:18}) }

    sortdiscountlowtohigh(querycondition){ this.props.onFetchSortdiscountlowtohigh(querycondition);this.props.onSetPageNo(1); this.setState({index:19}) }
    sortdiscounthightolow(querycondition){ this.props.onFetchSortdiscounthightolow(querycondition);this.props.onSetPageNo(1); this.setState({index:20}) }

    // sortratingslowtohigh(querycondition){ this.props.onFetchSortratingslowtohigh(querycondition) }
    // sortratingshightolow(querycondition){ this.props.onFetchSortratingshightolow(querycondition) }

    render() {
        console.log("props location from searchbar",this.props.childprops.location.pathname)
        console.log("popularbooks",this.state.popularbooks)
        return (
            <div className="pt-2" >
                <div className="search1 mt-2" >
                    <h4 className="text-info">Search By</h4>
                    {/* <li onClick={this.allbook.bind(this,this.state.allbookcategory)}>All</li> */}
                    <div class="nav">
                    
                        <div class="multi-level ml-0">
                            
                            <div class="item">
                                <input type="checkbox" id="A"/>
                                <img src={arrow} alt="arrow" class="arrow"/><label className="text-primary" for="A">Categories</label>
                                <ul className="ml-0">
                                    <li className = {1 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.allbook.bind(this,this.state.allbookcategory)}>All Books</li>
                                    <li className = {2 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.horror.bind(this,this.state.horror)}>Horror</li>
                                    <li className = {3 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.comedy.bind(this,this.state.comedy)}>Comedy</li>
                                    <li className = {4 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.adeventure.bind(this,this.state.adeventure)}>Adventure</li>
                                    <li className = {5 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.fiction.bind(this,this.state.fiction)}>Fiction</li>
                                    <li className = {6 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.ancient.bind(this,this.state.ancient)}>Ancient</li>
                                    <li className = {7 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.sciencefiction.bind(this,this.state.sciencefiction)}>Sciencefiction</li>
                                    <li className = {8 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.thriller.bind(this,this.state.thriller)}>Thriller</li>
                                    <li className = {9 === this.state.index ? "text-info font-weight-bold" :   ""}onClick={this.spritual.bind(this,this.state.spritual)}>Spritual</li>
                                    <li className = {10 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.classic.bind(this,this.state.classic)}>Classic</li>
                                </ul> 
                            </div>
                            
                            <div class="item">
                                <input type="checkbox" id="B"/>
                                <img src={arrow} alt="arrow" class="arrow"/><label className="text-primary" for="B">Price</label>
                                <ul>
                                    <li className = {11 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.below500.bind(this,this.state.below_500)}>Below 500</li>
                                    <li className = {12 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.aboveand500.bind(this,this.state.AboveEqual_500)}>500 and Above</li>
                                    <li className = {13 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.aboveand1000.bind(this,this.state.AboveEqual_1000)}>1000 and Above</li>                 
                                </ul>
                            </div>

                            <div class="item">
                                <input type="checkbox" id="C"/>
                                <img src={arrow} alt="arrow" class="arrow"/><label className="text-primary" for="C">Discount</label>
                                <ul>
                                    <li className = {14 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.discount50andabove.bind(this,this.state.dis50andAbove)}>50% and Above</li>
                                    <li className = {15 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.discount30andabove.bind(this,this.state.dis30andAbove)}>30% and Above</li>
                                    <li className = {16 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.discount10andabove.bind(this,this.state.dis10andAbove)}>10% and Above</li>
                                </ul>
                            </div>

                          
                        {this.props.childprops.location.pathname === '/allbookspage' ?
                            <><h4 className="text-info">Sort By</h4>

                            <div class="item">
                                <input type="checkbox" id="D"/>
                                <img src={arrow} alt="arrow" class="arrow"/><label className="text-primary" for="D">Price</label>
                                <ul>
                                    <li className = {17 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.sortpricelowtohigh.bind(this,this.state.sortpriceLtoH)}>Low to High</li>
                                    <li className = {18 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.sortpricehightolow.bind(this,this.state.sortpriceHtoL)}>High to Low</li>
                                </ul>
                            </div>

                            <div class="item">
                                <input type="checkbox" id="E"/>
                                <img src={arrow} alt="arrow" class="arrow"/><label className="text-primary" for="E">Discount</label>
                                
                                <ul>
                                    <li className = {19 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.sortdiscountlowtohigh.bind(this,this.state.sortdiscountLtoH)}>Low to High</li>
                                    <li className = {20 === this.state.index ? "text-info font-weight-bold" :   ""} onClick={this.sortdiscounthightolow.bind(this,this.state.sortdiscounHtoL)}>High to Low</li>
                                </ul>
                            </div></> :null
                        }

                            {/* <div class="item">
                                <input type="checkbox" id="F"/>
                                <img src={arrow} class="arrow"/><label className="text-primary" for="F">Rating</label>
                                
                                <ul>
                                    <li onClick={this.sortratingslowtohigh.bind(this,this.state.sortratingLtoH)}>Low to High</li>
                                    <li onClick={this.sortratingshightolow.bind(this,this.state.sortratingHtoL)}>High to Low</li>
                                </ul>
                            </div> */}

                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchallbook : (querycondition) => dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchhorror : (querycondition) => dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchcomedy : (querycondition) => dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchadeventure : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),  
        onFetchfiction : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchancient: (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchsciencefiction : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchthriller : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchspritual : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchclassic : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),

      
        onFetchPricebelow500 : (querycondition) => dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchPrice500andabove : (querycondition) => dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchPrice1000andabove : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        
        onFetchDiscount50andabove : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchDiscount30andabove : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchDiscount10andabove : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        
        // onFetchRatings5 : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        // onFetchRatings4 : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        // onFetchRatings3 : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        // onFetchRatings2 : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        // onFetchRatings1 : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),

        onFetchSortpricelowtohigh : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchSortpricehightolow : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),

        onFetchSortdiscountlowtohigh : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onFetchSortdiscounthightolow : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),

        // onFetchSortratingslowtohigh : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        // onFetchSortratingshightolow : (querycondition)=> dispatch(actions.fetchbooksbyquery(1,querycondition)),
        onSetPageNo :(num)=>dispatch({type:actions.SET_PAGE,payload:num})

    }
  }
  
  export default connect(null, mapDispatchToProps)(Searchbar);

    /* <div class="item">
    <input type="checkbox" id="G"/>
    <img src={arrow} class="arrow"/><label className="text-primary" for="G">Rating</label>
    <ul>
        <li onClick={this.ratings5.bind(this,this.state.rating5)}>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
        </li>
        <li onClick={this.ratings4.bind(this,this.state.rating4)}>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
        </li>
        <li onClick={this.ratings3.bind(this,this.state.rating3)}>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
        </li>
        <li onClick={this.ratings2.bind(this,this.state.rating2)}>
            <i className="text-warning"><FaStar/></i>
            <i className="text-warning"><FaStar/></i>
        </li>
        <li onClick={this.ratings1.bind(this,this.state.rating1)}>
            <i className="text-warning"><FaStar/></i>
        </li>
    </ul>
                            </div> */

// const mapStateToProps = (state) => {
//     console.log('Inside Component ', state);
//     return {
//         Books: state.BookReducer.books
//     }
//   }
  
    // price(selectedquery){
    //     console.log("selectedquery",selectedquery)
    //     var API = `http://localhost:4000/books/?${this.state.ratingsall}${selectedquery}`
    //     console.log("API",API)
    //     fetch(API,{
    //         headers:{'content-type': 'application/json'},
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         this.setState({popularbooks : data.data})
    //     });
    // }

    // all(){

    // }

// onFetchPricebelow500 : () => dispatch(actions.fetchbooksbypricebelow500()),
// onFetchPrice500andabove : () => dispatch(actions.fetchbooksbyprice500andabove()),
// onFetchPrice1000andabove : (querycondition)=> dispatch(actions.fetchbooksbyprice1000andabove(querycondition)),
