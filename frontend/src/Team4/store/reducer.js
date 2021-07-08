import * as actions from '../action/action';

let initialState = {
    books : [],
    homepagetodaydeals : [],
    homepagepopularbooks : [],
    homepagenewrelease : [],
    booksearchtitle : [],
    review : [],
    avgreview:[],
    bookdetail : [],
    pageNo : 1
}

const BookReducer = (state = initialState, action) =>{
    switch(action.type){
        case actions.GET_BOOKS_BY_QUERY : return {...state, books: action.payload } 
        case actions.GET_BOOKS_BY_HEADERSEARCHQUERY : return {...state, books: action.payload } 
        case actions.GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS : return {...state, homepagetodaydeals : action.payload } 
        case actions.GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS : return {...state, homepagepopularbooks : action.payload } 
        case actions.GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE : return {...state, homepagenewrelease : action.payload } 
        case actions.GET_BOOKS_BY_REVIEWS : return {...state, review : action.payload } 
        case actions.GET_BOOKS_BY_AVERAGE_REVIEWS : return {...state, avgreview : action.payload } 
        case actions.GET_BOOK_FOR_DESCRIPTION : return {...state, bookdetail : action.payload } 
        case actions.GET_BOOK_FOR_SEARCH_TITLE : return {...state, booksearchtitle : action.payload}
        case actions.SET_PAGE : return {...state, pageNo : action.payload}
        default : return {...state}
    }
}



export default BookReducer;