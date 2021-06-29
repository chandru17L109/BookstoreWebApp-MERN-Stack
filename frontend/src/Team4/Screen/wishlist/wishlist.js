import React, { Component } from 'react'

export default class WishPage extends Component {

    constructor(){
        super();
        this.state = {allcart : []}  
    }

    // componentDidMount(){
    //     fetch('http://localhost:8080/api/wishlist/user2@gmail.com',{
    //         headers:{'content-type': 'application/json'},
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         this.setState({allcart : data})
    //     });
    //     console.log("alldeals",this.state.allcart)
    // }
    
    // SellingPrice(costprice, pricediscount){
    //     return costprice - (costprice * pricediscount/100)
    // }

    render() {
        // console.log("wishlist",this.state.allcart.books )
    
        
        // var allcartdata = this.state.allcart.map((cart, i)=>{
        //     return(
        //         <div key={i}>
        //             <table cellpadding="20" cellspacing="10">
        //               <tr style={{fontSize:"17px"}}>
        //               <th className="text-primary">{cart.email}</th>
        //               {/* <th className="text-dark">{cart.email}</th> */}
        //             </tr>
        //             </table>
        //         </div>
        //     )
        // })
        
        return (
            <>
                <div style={{margin:" 20px 100px"}}>
                    <h1 style={{marginLeft:"400px"}}>Wish List</h1>
                    {/* {allcartdata} */}
                </div>
            </>
        )
    }
}

