export const GET_BOOKS_BY_QUERY = "GET_BOOKS_BY_QUERY"
export const GET_BOOKS_BY_HEADERSEARCHQUERY = "GET_BOOKS_BY_HEADERSEARCHQUERY"
export const GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS = "GET_BOOKS_BY_QUERY_HOMEPAGE_TODAYDEALS"
export const GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS = "GET_BOOKS_BY_QUERY_HOMEPAGE_POPULARBOOKS"
export const GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE = "GET_BOOKS_BY_QUERY_HOMEPAGE_NEWRELEASE"
export const GET_BOOKS_BY_QUERY_PAGINATION = "GET_BOOKS_BY_QUERY_PAGINATION"
export const ADD_TO_WISH_LIST = "ADD_TO_WISH_LIST"
export const ADD_TO_CART_LIST = "ADD_TO_CART_LIST"



const API = "http://localhost:8080"
var FETCHQUERY = ""
var templist =[]

var FINDURL = () => {
    var url = window.location.href.split("/");
    console.log("window.location.href",url)
    var findurl = url[url.length - 1]
    console.log("findurl",findurl)

    if(findurl === "allbookspage"){
        FETCHQUERY = "/"
    }else if(findurl === "newrelease"){
        FETCHQUERY = "&sort=-date"
    }else if(findurl === "popularpage"){
        FETCHQUERY = "&sort=-ratings"
    }else if(findurl === "todaydealspage"){
        FETCHQUERY = "&sort=-discount"
    }else{
        FETCHQUERY = "/?"
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
    console.log("templist",templist)
    if(condition !== ""){
        templist.pop()
        templist.push([cur_page,query,condition])
    }
    if(condition === ""){
        if(templist.length >= 1){
            if(templist[templist.length - 1] !== ""){
                var fetchlist = []
                fetchlist.push([cur_page,templist[templist.length - 1][1],templist[templist.length - 1][2]])
                return fetchlist
            }
        }
    }
    return fetch
}

export const fetchbooksbyquery = (cur_page,givencondition) => {
    console.log("cur_page",cur_page)
    let query = FINDURL();
    console.log("query",query);
    let condition = CONDITION(givencondition)
    console.log("condition",condition);
    var current_page = PAGE_NO(cur_page,query,condition)

    console.log("current_page",current_page)
    


    console.log("currentpage[0]",current_page[0][0])
    console.log("currentpage[1]",current_page[0][1])
    console.log("currentpage[2]",current_page[0][2])

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
    console.log("query",query);
    let condition = CONDITION(givencondition)
    console.log("condition",condition);

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
    console.log("query",query);
    let condition = CONDITION(givencondition)
    console.log("condition",condition);

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
    console.log("query",query);
    let condition = CONDITION(givencondition)
    console.log("condition",condition);

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
    console.log("searchvalue",searchvalue);
    console.log(`${API}/books/CommonSearch/${searchvalue}`)

    return dispatch => {
        return fetch(`${API}/books/CommonSearch/${searchvalue}`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(data =>data.json()) 
            .then(res=>{
                // this.setstate({books:res.data})
                console.log("res",res)
                dispatch({
                    type : GET_BOOKS_BY_HEADERSEARCHQUERY,
                    payload : res
                })
            })
    }
}

export const fetchAllbooksPagination = (currentpage) => {

    console.log(`${API}/books?page=${currentpage}&limit=12`)

        return dispatch => {
            return fetch(`${API}/books?page=${currentpage}&limit=12`, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(data =>data.json()) 
                .then(res=>{
                    dispatch({
                        type : GET_BOOKS_BY_QUERY_PAGINATION,
                        payload : {
                            data : res.data,
                            paginate : res.pagination
                        }
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


    // else{
    //     FETCHQUERY = `/CommonSearch/${findurl}/?1`
    // }

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// export const GET_BOOKS_BY_MIXEDCOLLECTION = "GET_BOOKS_BY_MIXEDCOLLECTION"
// export const GET_BOOKS_BY_TODAYDEALS = "GET_BOOKS_BY_TODAYDEALS"
// export const GET_BOOKS_BY_NEWRELEASE = "GET_BOOKS_BY_NEWRELEASE"
// export const GET_BOOKS_BY_POPULAR = "GET_BOOKS_BY_POPULAR" 
// export const GET_BOOKS_BY_PRICE_LESSTHAN500 = "GET_BOOKS_BY_PRICE_LESSTHAN500"
// export const GET_BOOKS_BY_PRICE_500ANDABOVE = "GET_BOOKS_BY_PRICE_500ANDABOVE"
// export const GET_BOOKS_BY_PRICE_1000ANDABOVE = "GET_BOOKS_BY_PRICE_1000ANDABOVE"
// export const fetchbooksbypricebelow500 = () => {

//     let query = FINDURL();
//     console.log("query",query)

//     return dispatch => {
//         return fetch(`${API}/books${query}&price[lt]=500`, {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_PRICE_LESSTHAN500,
//                     payload : res.data
//                 })
//             })
//     }
// }

// export const fetchbooksbypricebelow500 = () => {

//     let query = FINDURL();
//     console.log("query",query)

//     return dispatch => {
//         return fetch(`${API}/books${query}&price[lt]=500`, {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_PRICE_LESSTHAN500,
//                     payload : res.data
//                 })
//             })
//     }
// }
// export const fetchbooksbyprice500andabove= () => {

//     let query = FINDURL();
//     console.log("query",query)

//     return dispatch => {
//         return fetch(`${API}/books${query}&price[gte]=500`, {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_PRICE_1000ANDABOVE,
//                     payload : res.data
//                 })
//             })
//     }
// }

// export const fetchbooksbyprice1000andabove= (querycondition) => {

//     let query = FINDURL();
//     console.log("query",query)

//     return dispatch => {
//         return fetch(`${API}/books${query}&${querycondition}`, {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_PRICE_1000ANDABOVE,
//                     payload : res.data
//                 })
//             })
//     }
// }






// ------------------------------------------------------------------------

// export const fetchbooksbymixedcollections = () => {
//     return dispatch => {
//         return fetch(API+'/books', {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json()) 
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_MIXEDCOLLECTION,
//                     payload : res.data
//                 })
//             })
//     }
// }
// export const fetchbooksbytodaydeals = () => {
//     return dispatch => {
//         return fetch(API+'/books?sort=-discount', {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_TODAYDEALS,
//                     payload : res.data
//                 })
//             })
//     }
// }

// export const fetchbooksbynewrelease = () => {
//     return dispatch => {
//         return fetch(API+'/books?sort=-date', {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_NEWRELEASE,
//                     payload : res.data
//                 })
//             })
//     }
// }

// export const fetchbooksbypopularbooks = () => {
//     return dispatch => {
//         return fetch(API+'/books?sort=-ratings', {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json())
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_POPULAR,
//                     payload : res.data
//                 })
//             })
//     }
// }


// if(query[query.length-1] === 1){
//     return dispatch => {
//         return fetch(`${API}/books${query}${condition}`, {
//                 headers: { 'Content-Type': 'application/json' },
//             })
//             .then(data =>data.json()) 
//             .then(res=>{
//                 dispatch({
//                     type : GET_BOOKS_BY_QUERY,
//                     payload : res
//                 })
//             })
//     }
//