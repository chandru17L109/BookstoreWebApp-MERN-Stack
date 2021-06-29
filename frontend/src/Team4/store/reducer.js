import * as actions from '../action/action';

let initialState = {
    books : [],
    homepagetodaydeals : [],
    homepagepopularbooks : [],
    homepagenewrelease : [],
    booksPagination : [],
}

const BookReducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.GET_BOOKS_BY_QUERY : return {...state, books: action.payload } 
        case actions.GET_BOOKS_BY_HEADERSEARCHQUERY : return {...state, books: action.payload } 
        case actions.GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS : return {...state, homepagetodaydeals : action.payload } 
        case actions.GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS : return {...state, homepagepopularbooks : action.payload } 
        case actions.GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE : return {...state, homepagenewrelease : action.payload } 
        case actions.GET_BOOKS_BY_QUERY_PAGINATION : return {...state, booksPagination : action.payload } 
        default : return {...state}
    }
}



export default BookReducer;