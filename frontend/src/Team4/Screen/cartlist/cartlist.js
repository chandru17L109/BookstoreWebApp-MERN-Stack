import React, { Component } from 'react'

export default class CartPage extends Component {

    constructor(){
        super();
        this.state = {allcart : [],books:[]}  
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/cartlist/user1@gmail.com',{
            headers:{'content-type': 'application/json'},
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({allcart : data,books:data.books})
        });
    }
    
    SellingPrice(costprice, pricediscount){
        return costprice - (costprice * pricediscount/100)
    }

    render() {

        console.log("books",this.state.books)

        console.log("cartlist allcart.books", this.state.allcart.books)
       

        var a = this.state.allcart

        console.log("cartlist",a)

        var allcartdata = this.state.books.map((cart, i)=>{
            return(
                <div key={i}>
                    <table cellpadding="20" cellspacing="10">
                      <tr style={{fontSize:"17px"}}>
                      <th className="text-primary">{cart.bookid}</th>
                      <th className="text-dark">{cart.quantity}</th>
                    </tr>
                    </table>
                </div>
            )
        })
        
        return (
            <>
                <div style={{margin:" 20px 100px"}}>
                    <h1 style={{marginLeft:"400px"}}>Cart</h1>
                    {allcartdata}
                </div>
            </>
        )
    }
}

