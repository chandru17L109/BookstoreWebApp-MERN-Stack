export const GET_BOOKS_BY_QUERY = "GET_BOOKS_BY_QUERY"
export const GET_BOOKS_BY_HEADERSEARCHQUERY = "GET_BOOKS_BY_HEADERSEARCHQUERY"
export const GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS = "GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS"
export const GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS = "GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS"
export const GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE = "GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE"
export const ADD_TO_WISH_LIST = "ADD_TO_WISH_LIST"
export const ADD_TO_CART_LIST = "ADD_TO_CART_LIST"
export const ADD_REVIEW = "ADD_REVIEW"
export const GET_BOOKS_BY_REVIEWS = "GET_BOOKS_BY_REVIEWS"
export const GET_BOOKS_BY_AVERAGE_REVIEWS = "GET_BOOKS_BY_AVERAGE_REVIEWS"
export const GET_BOOK_FOR_DESCRIPTION = "GET_BOOK_FOR_DESCRIPTION"
export const GET_BOOK_FOR_SEARCH_TITLE = "GET_BOOK_FOR_SEARCH_TITLE"
export const SET_PAGE = "SET_PAGE"


const API = "https://bookstore-13.herokuapp.com"
var FETCHQUERY = ""
var templist =[]
var currentpage =""

var FINDURL = () => {
    var url = window.location.href.split("/");
    var findurl = url[url.length - 1]

    if(findurl === "allbookspage"){
        FETCHQUERY = "/?"
        currentpage = "/?"
    }else if(findurl === "newrelease"){
        FETCHQUERY = '&sort=-publishDate'
        currentpage = '&sort=-publishDate'
    }
    else if(findurl === "todaydealspage"){
        FETCHQUERY = '&sort=-discount'
        currentpage = '&sort=-discount'
    }else{
        FETCHQUERY = "/?"
        currentpage = "/?"
    }
    return FETCHQUERY
}

var CONDITION = (givencondition) =>{
    var specificCondition = ""
    if(givencondition){
        specificCondition = givencondition
    }else{
        specificCondition = ""
    }
    return specificCondition
}

var PAGE_NO = (cur_page,query,condition) => {
    var fetch = []
    fetch.push([cur_page,query,condition])
    if((condition !== "")){
        templist.pop()
        templist.push([cur_page,query,condition])
    }
    if(condition === ""){
        if(templist.length >= 1){
                if(templist[templist.length - 1][1] !== currentpage){
                    var fetchlist = []
                    fetchlist.push([cur_page,  currentpage , ""])
                    return fetchlist
                }
                else{
                    fetchlist = []
                    fetchlist.push([cur_page,  templist[templist.length - 1][1], templist[templist.length - 1][2]])
                    return fetchlist
                }
            }
    }
    return fetch
}

export const fetchbooksbyquery = (cur_page,givencondition) => {
    let query = FINDURL();
    let condition = CONDITION(givencondition)
    var current_page = PAGE_NO(cur_page,query,condition)

    var pageno_   = current_page[0][0]
    var sort_ = current_page[0][1]
    var condition_  = current_page[0][2]

    var Current_API = `${API}/books?page=${pageno_}&limit=12${sort_}${condition_}`

    console.log("Current_API",Current_API)

        return dispatch => {
            return fetch(Current_API, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : GET_BOOKS_BY_QUERY,
                        payload : res.data
                    })
                })
        }
}

export const fetchbooksHomepagetodaydeals = (givencondition) => {
    let query = FINDURL();
    let condition = CONDITION(givencondition)

    console.log(`${API}/books${query}${condition}`)

    return dispatch => {
        return fetch(`${API}/books${query}${condition}`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(data =>data.json()) 
            .then(res=>{
                dispatch({
                    type : GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS,
                    payload : res.data
                })
            })
        }
    }

export const fetchbooksHomepagepopularbooks = (givencondition) => {
    let query = FINDURL();
    let condition = CONDITION(givencondition)

    console.log(`${API}/books${query}${condition}`)

        return dispatch => {
            return fetch(`${API}/books${query}${condition}`, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS,
                        payload : res.data
                    })
                })
        }
}

export const fetchbooksHomepagenewrelease = (givencondition) => {
    let query = FINDURL();
    let condition = CONDITION(givencondition)

    console.log(`${API}/books${query}${condition}`)

        return dispatch => {
            return fetch(`${API}/books${query}${condition}`, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE,
                        payload : res.data
                    })
                })
        }
}

export const fetchheadersearchresults = (searchvalue) => {
    console.log(`${API}/books/CommonSearch/${searchvalue}`)

    return dispatch => {
        return fetch(`${API}/books/CommonSearch/${searchvalue}`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(data =>data.json()) 
            .then(res=>{
                dispatch({
                    type : GET_BOOKS_BY_HEADERSEARCHQUERY,
                    payload : res
                })
            })
    }
}

export const Addtocartlist = (email,bookid) => {

    console.log(`${API}/api/cartlist/`)

        return dispatch => {
            return fetch(`${API}/api/cartlist/`, {
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify({email: email, bookid : bookid}),
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : ADD_TO_CART_LIST,
                        payload : {
                            data : res
                        }
                    })
                })
        }
}

export const Addtowishlist = (email,bookid) => {
    console.log(`${API}/api/wishlist/`)
        return dispatch => {
            return fetch(`${API}/api/wishlist/`, {
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify({email: email, books : bookid}),
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : ADD_TO_WISH_LIST,
                        payload : {
                            data : res
                        }
                    })
                })
        }
}

export const AddReview = (rating,comment,username,bookid) => {
    console.log(rating,comment,username,bookid)
    var add_review_data = {rating : rating, comment : comment, user : username, book : bookid }
    console.log(`${API}/books/review`)
        return dispatch => {
            return fetch(`${API}/books/review`, {
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(add_review_data),
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : ADD_REVIEW,
                        payload : {
                            data : res
                        }
                    })
                })
        }
}

export const FetchReview = (bookid) => {

    console.log(`${API}/books/review?book=${bookid}`)

        return dispatch => {
            return fetch(`${API}/books/review?book=${bookid}`, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : GET_BOOKS_BY_REVIEWS,
                        payload : {
                            data : res.data
                        }
                    })
                })
        }
}

export const FetchAverageReview = () => {
    console.log(`${API}/books/review/avgrating`)
        return dispatch => {
            return fetch(`${API}/books/review/avgrating`, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : GET_BOOKS_BY_AVERAGE_REVIEWS,
                        payload : res
                    })
                })
        }
}

export const FetchBookDescription = (bookid) =>{

    return dispatch => {
        return fetch(`${API}/books?_id=${bookid}`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(data =>data.json()) 
            .then(res=>{
                console.log("res",res)
                dispatch({
                    type : GET_BOOK_FOR_DESCRIPTION,
                    payload : res.data[0]
                })
            })
    }
}

export const FetchBookSearchByTitle = () =>{
    console.log(`${API}/books?limit=40`)

    return dispatch => {
        return fetch(`${API}/books?limit=40`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res=>res.json()) 
            .then(data=>{
                dispatch({
                    type : GET_BOOK_FOR_SEARCH_TITLE,
                    payload : data.data
                })
            })
    }
}
